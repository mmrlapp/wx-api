import type {
  WXEvenHandlerOptions,
  WXEventDetail,
  WXEventListenerOrWXEventListenerObject,
  WXEventMap,
  WXEventNativeType,
  WXEventType,
} from "../types/WXEvent";
import { WXEvent } from "./WXEvent";

const defaultOptions: WXEvenHandlerOptions = {
  cordova: false,
};

export class WXEventHandler {
  private _initialized = false;
  private _handlers = new WeakMap();
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

        const data: WXEventDetail | undefined = JSON.parse(event.data);
        if (!data?.type) return;

        const eventType: WXEventType =
          this._eventTypes[data.type as WXEventNativeType] ??
          (data.type as WXEventType);

        this._dispatch(window, eventType, data);
      } catch (err) {
        console.error("[WXEvent] Message error:", err);
      }
    });
  }

  private _dispatch(
    element: Window | Element,
    type: WXEventType,
    detail: WXEventDetail
  ) {
    const event = new WXEvent(type);
    event.wx = detail.data;
    event.wxOrigin = "system";
    element.dispatchEvent(event);
  }

  public on<K extends keyof WXEventMap>(
    element: Window | Element,
    type: K,
    handler: WXEventListenerOrWXEventListenerObject<WXEventMap[K]>
  ) {
    if (!this._initialized) new WXEventHandler();

    const wrapper: WXEventListenerOrWXEventListenerObject<WXEventMap[K]> = (
      event
    ) => {
      if (!(event instanceof WXEvent)) {
        console.warn("[WXEvent] Event is not a WXEvent:", event);
        return;
      }

      if (event.wxOrigin === "system") {
        if (typeof handler === "function") {
          handler(event);
        } else if (handler && typeof handler.handleEvent === "function") {
          handler.handleEvent(event);
        }
      }
    };

    if (!this._handlers.has(element)) {
      this._handlers.set(element, new Map());
    }

    const elementHandlers = this._handlers.get(element);
    if (!elementHandlers.has(type)) {
      elementHandlers.set(type, new Set());
    }

    elementHandlers.get(type).add({ handler, wrapper });
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

    for (const entry of elementHandlers.get(type)) {
      if (entry.handler === handler) {
        element.removeEventListener(type, entry.wrapper);
        elementHandlers.get(type).delete(entry);
        break;
      }
    }
  }
}
