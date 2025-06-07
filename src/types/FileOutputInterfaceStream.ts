/**
 * This is a private interface which is not accessible in the window object.
 * It is used to define the structure of a file input stream.
 */
export interface FileOutputInterfaceStream {
  write(b: number): void;
  flush(): void;
  close(): void;
}
