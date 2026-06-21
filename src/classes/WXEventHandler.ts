import type {
  WXEvenHandlerOptions,
  WXEventListenerOrWXEventListenerObject,
  WXEventMap,
  WXEventNativeType,
  WXEventType,
} from "../types/WXEvent";
import { WXEvent } from "./WXEvent";

const defaultOptions: WXEvenHandlerOptions = {
  cordova: false,
};

type MXHandler = {
  destroy?: () => void;
};

type HandlerEntry = {
  handler: WXEventListenerOrWXEventListenerObject;
  wrapper: EventListener;
  mxWrapper: (payload: unknown) => void;
  mxEventType: string;
  mxHandler?: MXHandler;
};

type ElementHandlers = Map<WXEventType, Set<HandlerEntry>>;

export class WXEventHandler {
  private _initialized = false;
  private _handlers = new WeakMap<Window | Element, ElementHandlers>();
  private _eventTypes!: Record<WXEventNativeType, WXEventType>;

  public get eventTypes() {
    return this._eventTypes;
  }

  public constructor(options: WXEvenHandlerOptions = defaultOptions) {
    if (this._initialized) return;
    this._initialized = true;

    this._eventTypes = {
      WX_ON_BACK: options.cordova ? "backbutton" : "back",
      WX_ON_RESUME: "resume",
      WX_ON_REFRESH: "refresh",
      WX_ON_PAUSE: "pause",
      WX_ON_KEYBOARD: "keyboard",
      WX_ON_INSETS: "insets",
    };

    window.addEventListener("message", (event) => {
      try {
        if (typeof event.data !== "string") return;

        const data = JSON.parse(event.data) as Record<string, unknown>;
        const eventType = this._parseIncomingEventType(data);
        if (!eventType) return;

        this._dispatch(window, eventType, data.data ?? data);
      } catch (err) {
        console.error("[WXEvent] Message error:", err);
      }
    });
  }

  private _dispatch(
    element: Window | Element,
    type: WXEventType,
    detail: unknown
  ) {
    const event = new WXEvent(type);
    event.wx = detail;
    event.wxOrigin = "system";
    element.dispatchEvent(event);
  }

  private _parseIncomingEventType(
    data: Record<string, unknown>
  ): WXEventType | undefined {
    if (typeof data.type === "string") {
      return (
        this._eventTypes[data.type as WXEventNativeType] ??
        this._parseMXIncomingType(data.type)
      );
    }

    if (typeof data.event === "string") {
      return this._parseMXIncomingType(data.event);
    }

    return undefined;
  }

  private _parseMXIncomingType(type: string): WXEventType | undefined {
    switch (type) {
      case "back":
      case "backbutton":
        return this._eventTypes.WX_ON_BACK;
      case "keyboardState":
      case "keyboard":
        return "keyboard";
      case "backCancelled":
      case "backPressed":
      case "backStarted":
      case "backProgressed":
      case "resume":
      case "refresh":
      case "pause":
      case "insets":
        return type;
      default:
        return undefined;
    }
  }

  private _parseMXEventType(type: string): string {
    switch (type) {
      case "back":
      case "backbutton":
        return "backPressed";
      case "keyboard":
        return "keyboardState";
      default:
        return type;
    }
  }

  private _invokeHandler(
    handler: WXEventListenerOrWXEventListenerObject,
    event: WXEvent
  ) {
    if (typeof handler === "function") {
      handler(event);
    } else if (handler && typeof handler.handleEvent === "function") {
      handler.handleEvent(event);
    }
  }

  public on<K extends keyof WXEventMap>(
    element: Window | Element,
    type: K,
    handler: WXEventListenerOrWXEventListenerObject<WXEventMap[K]>
  ) {
    if (!this._initialized) new WXEventHandler();

    const wrapper: EventListener = (event) => {
      if (!(event instanceof WXEvent)) {
        console.warn("[WXEvent] Event is not a WXEvent:", event);
        return;
      }

      if (event.wxOrigin === "system") {
        this._invokeHandler(handler, event);
      }
    };

    const mxWrapper = (payload: unknown) => {
      const event = new WXEvent(type);
      event.wx = payload as WXEventMap[K];
      event.wxOrigin = "system";
      this._invokeHandler(handler, event);
    };

    if (!this._handlers.has(element)) {
      this._handlers.set(element, new Map());
    }

    const elementHandlers = this._handlers.get(element) ?? new Map();
    this._handlers.set(element, elementHandlers);

    if (!elementHandlers.has(type)) {
      elementHandlers.set(type, new Set());
    }

    const mxEventType = this._parseMXEventType(type);
    const mxListener = (element as any).addMXEventListener;
    let mxHandler: MXHandler | undefined;

    if (typeof mxListener === "function") {
      mxHandler = mxListener.call(element, mxEventType, mxWrapper) as
        | MXHandler
        | undefined;
    }

    elementHandlers
      .get(type)
      ?.add({ handler, wrapper, mxWrapper, mxEventType, mxHandler });

    element.addEventListener(type, wrapper);

    return () => this.off(element, type, handler);
  }

  public off(
    element: Window | Element,
    type: WXEventType,
    handler: WXEventListenerOrWXEventListenerObject
  ): void {
    const elementHandlers = this._handlers.get(element);
    if (!elementHandlers?.has(type)) return;

    const typeHandlers = elementHandlers.get(type);
    if (!typeHandlers) return;

    for (const entry of typeHandlers) {
      if (entry.handler === handler) {
        element.removeEventListener(type, entry.wrapper);
        if (typeof entry.mxHandler?.destroy === "function") {
          entry.mxHandler.destroy();
        } else {
          const removeMX = (element as any).removeMXEventListener;
          if (typeof removeMX === "function") {
            removeMX.call(element, entry.mxEventType, entry.mxWrapper);
          }
        }

        typeHandlers.delete(entry);
        break;
      }
    }

    if (typeHandlers.size === 0) {
      elementHandlers.delete(type);
    }

    if (elementHandlers.size === 0) {
      this._handlers.delete(element);
    }
  }
}
