import type { WXEvent } from "../classes/WXEvent";

export interface WXEvenHandlerOptions {
  cordova: boolean;
}

export type WXEventNativeType =
  | "WX_ON_BACK"
  | "WX_ON_RESUME"
  | "WX_ON_REFRESH"
  | "WX_ON_PAUSE"
  | "WX_ON_KEYBOARD"
  | "WX_ON_INSETS";

export type WXEventType =
  | "back"
  | "backbutton" // Cordova compatibility
  | "resume"
  | "refresh"
  | "pause"
  | "keyboard"
  | "insets";

export type WXEventDetail<T = any> = {
  type: WXEventNativeType;
  data?: T;
};

export interface WXEventListener<T = any> extends EventListener {
  (evt: WXEvent<T>): void;
}

export interface WXEventListenerObject<T = any> extends EventListenerObject {
  handleEvent(object: WXEvent<T>): void;
}

export type WXEventListenerOrWXEventListenerObject<T = any> =
  | WXEventListener<T>
  | WXEventListenerObject<T>;

export interface WXRefreshEvent extends Event {
  isRefreshing: boolean;
  isShown: boolean;
  isEnabled: boolean;
}

export interface WXInsetsEvent extends Event {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface WXKeyboardEvent extends Event {
  visible: boolean;
}

export interface WXEventMap extends Record<WXEventType, Event | null> {
  back: null;
  resume: null;
  refresh: WXRefreshEvent;
  pause: null;
  keyboard: WXKeyboardEvent;
  insets: WXInsetsEvent;
}
