import type { IntentData } from "./IntentInterface";
import type { WXApp } from "./WXApp";

export interface ApplicationInterface {
  exit(): void;
  setRefreshing(state: boolean): void
  getCurrentRootManager(): WXApp;
  getCurrentApplication(): WXApp;
  getApplication(packageName: string): WXApp;
  startActivity(i: IntentData | null): void;
  openFile(i: IntentData | null): void;
}
