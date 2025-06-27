import type { IntentData } from "./IntentInterface";
import type { WXApp } from "./WXApp";

export interface ApplicationInterface {
  getCurrentRootManager(): WXApp;
  getCurrentApplication(): WXApp;
  getApplication(packageName: string): WXApp;
  setRefreshing(state: boolean): void;
  exit(): void;
  startActivity(i: IntentData | null): void;
  openFile(i: IntentData | null): void;
}
