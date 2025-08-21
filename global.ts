import type { ApplicationInterface } from "./src/types/ApplicationInterface";
import type { FileInputInterface } from "./src/types/FileInputInterface";
import type { FileInterface } from "./src/types/FileInterface";
import type { FileOutputInterface } from "./src/types/FileOutputInterface";
import type { IntentInterface } from "./src/types/IntentInterface";
import type { ModuleInterface } from "./src/types/ModuleInterface";

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
