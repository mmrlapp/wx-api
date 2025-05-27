import type { CustomWXEvent } from "../classes/CustomWXEvent";

export type WXEventNativeType = "WX_ON_BACK" | "WX_ON_RESUME" | "WX_ON_PAUSE";
export type WXEventType = "back" | "resume" | "pause";
export type WXEventDetail = {
  type: WXEventNativeType;
};
export interface WXEventListener extends EventListener {
  (evt: CustomWXEvent): void;
}
export interface WXEventListenerObject extends EventListenerObject {
  handleEvent(object: CustomWXEvent): void;
}
export type WXEventListenerOrWXEventListenerObject =
  | WXEventListener
  | WXEventListenerObject;
