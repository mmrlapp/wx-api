import type { WXEventDetail, WXEventType } from "../types/WXEvent";

export class CustomWXEvent extends CustomEvent<WXEventDetail> {
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
