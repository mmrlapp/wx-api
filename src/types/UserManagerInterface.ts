import type { WXUserInfo } from "./WXUserInfo";

export interface UserManagerInterface {
  /**
   * This is a JSON string and needs to be parsed with `JSON.parse(...)`
   */
  getUsers(): string;
  getUserInfo(userId: number): WXUserInfo;
}
