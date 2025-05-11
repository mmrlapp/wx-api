import type { FileInputInterfaceStream } from "./FileInputInterfaceStream";
import type { WXApplicationInfo } from "./WXApplicationInfo";

export interface PackageManagerInterface {
  getPackageUid(packageName: string, flags: number, userId: number): number;
  /**
   * Method run heavy operations
   */
  getApplicationIcon(packageName: string, flags: number, userId: number): FileInputInterfaceStream | null;
  getInstalledPackages(flags: number, userId: number): string;
  getApplicationInfo(packageName: string, flags: number, userId: number): WXApplicationInfo;
}
