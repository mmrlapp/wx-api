import type { WXApp } from "./WXApp";

export interface ApplicationInterface {
  getCurrentRootManager(): WXApp;
  getCurrentApplication(): WXApp;
  getApplication(packageName: string): WXApp;
}
