/**
 * @internal
 * 
 * Represents a stream interface for file output operations.
 * Provides methods to write data, flush buffered data, and close the stream.
 * 
 * This is a private interface which is not accessible in the window object.
 */
export interface FileOutputInterfaceStream {
  /**
   * Writes a single byte to the output stream.
   * @param b - The byte value to write.
   */
  write(b: number): void;

  /**
   * Flushes any buffered data to the underlying file or output destination.
   */
  flush(): void;

  /**
   * Closes the output stream and releases any associated resources.
   */
  close(): void;
}
