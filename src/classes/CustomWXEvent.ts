import type { WXEventDetail, WXEventType } from "../types/WXEvent";

export class CustomWXEvent<T = any> extends CustomEvent<WXEventDetail<T>> {
  private _wxOrigin?: string | undefined;

  get wxOrigin() {
    return this._wxOrigin;
  }
  set wxOrigin(value: string | undefined) {
    this._wxOrigin = value;
  }

  public constructor(type: WXEventType, detail?: WXEventDetail) {
    super(type, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  }
}
