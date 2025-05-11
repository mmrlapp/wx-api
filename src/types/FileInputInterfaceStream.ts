/**
 * This is a private interface which is not accessible in the window object.
 * It is used to define the structure of a file input stream.
 */
export interface FileInputInterfaceStream {
  read(): number;
  /**
   * This method needs to be parsed with `JSON.parse(...)`
   * @param chinkSize The size of the chunk to read
   * @returns The chunk data as a string
   */
  readChunk(chinkSize: number): string;
  close(): void;
  skip(n: number): number;
}
