import type { FileOutputInterfaceStream } from "../types/FileOutputInterfaceStream";

export async function wrapOutputStream(
  readableStream: ReadableStream<Uint8Array>,
  outputStreamInstance: FileOutputInterfaceStream
) {
  if (!readableStream || typeof readableStream.getReader !== "function") {
    throw new Error("Invalid ReadableStream provided.");
  }
  if (
    !outputStreamInstance ||
    typeof outputStreamInstance.write !== "function" ||
    typeof outputStreamInstance.close !== "function"
  ) {
    throw new Error(
      "Invalid outputStreamInstance provided. It must be an already opened stream with 'write' and 'close' methods."
    );
  }

  const writableStream: WritableStream<Uint8Array> = new WritableStream({
    async start(controller) {
      console.log("WritableStream started, output stream instance ready.");
    },

    async write(chunk, controller) {
      if (chunk instanceof Uint8Array) {
        for (let i = 0; i < chunk.length; i++) {
          outputStreamInstance.write(chunk[i]);
        }
      } else {
        console.warn("Received non-Uint8Array chunk in WritableStream:", chunk);
        controller.error(new TypeError("Expected Uint8Array chunks."));
      }
    },

    async close() {
      console.log("WritableStream closed. Flushing and closing native stream.");
      try {
        outputStreamInstance.flush();
        outputStreamInstance.close();
      } catch (error) {
        console.error("Error during WritableStream close cleanup:", error);
        throw error;
      }
    },

    async abort(reason) {
      console.error("WritableStream aborted:", reason);
      try {
        outputStreamInstance.close();
      } catch (error) {
        console.error("Error during WritableStream abort cleanup:", error);
      }
    },
  });

  // Pipe the readableStream to the writableStream
  try {
    await readableStream.pipeTo(writableStream);
    console.log("Piping completed successfully.");
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Error during stream piping:", err);
    throw new Error(`Failed to pipe stream: ${err.message}`);
  }
}
