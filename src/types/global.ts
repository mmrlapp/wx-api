import type { ApplicationInterface } from "./ApplicationInterface";
import type { FileInputInterface } from "./FileInputInterface";
import type { FileInterface } from "./FileInterface";
import type { FileOutputInterface } from "./FileOutputInterface";
import type { IntentInterface } from "./IntentInterface";
import type { ModuleInterface } from "./ModuleInterface";

export {};

export type ModuleInterfaceToken = `$${string}`;
export type FileInterfaceToken = `$${string}File`;
export type FileInputInterfaceToken = `$${string}FileInputStream`;
export type FileOutputInterfaceToken = `$${string}FileOutputStream`;

export type MimeType = `${string}/${string}`;

declare global {
  interface Window {
    webui: ApplicationInterface;
    [`$intent`]: IntentInterface;
    [key: ModuleInterfaceToken]: ModuleInterface;
    [key: FileInterfaceToken]: FileInterface;
    [key: FileInputInterfaceToken]: FileInputInterface;
    [key: FileOutputInterfaceToken]: FileOutputInterface;
  }
}
