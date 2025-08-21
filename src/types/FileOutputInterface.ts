import type { FileOutputInterfaceStream } from "./FileOutputInterfaceStream";

/**
 * Interface for file output operations, providing methods to open files for writing.
 * Implementations should return a {@link FileOutputInterfaceStream} for file manipulation.
 */
export interface FileOutputInterface {
  /**
   * Opens a file at the specified path for output.
   * If `append` is true, data will be appended to the file; otherwise, the file will be overwritten.
   *
   * @param path - The path to the file to open.
   * @param append - Whether to append to the file (`true`) or overwrite it (`false`).
   * @returns A {@link FileOutputInterfaceStream} for writing to the file.
   */
  open(path: string, append: boolean): FileOutputInterfaceStream;

  /**
   * Opens a file at the specified path for output.
   * The default behavior for appending or overwriting is implementation-dependent.
   *
   * @param path - The path to the file to open.
   * @returns A {@link FileOutputInterfaceStream} for writing to the file.
   */
  open(path: string): FileOutputInterfaceStream;
}
