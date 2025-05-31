import type { WXEventDetail, WXEventType } from "../types/WXEvent";

export class WXEvent<T = any> extends Event {
  private _wxOrigin?: string | undefined;
  private _wxData?: T | undefined;

  public get wxOrigin() {
    return this._wxOrigin;
  }

  public set wxOrigin(value: string | undefined) {
    this._wxOrigin = value;
  }

  public get wx(): T | undefined {
    return this._wxData;
  }

  public set wx(value: T | undefined) {
    this._wxData = value;
  }

  public constructor(type: WXEventType) {
    super(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  }
}
