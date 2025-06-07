import type { FileOutputInterfaceStream } from "./FileOutputInterfaceStream";

export interface FileOutputInterface {
  open(path: string, append: boolean): FileOutputInterfaceStream | null;
  open(path: string): FileOutputInterfaceStream | null;
}
