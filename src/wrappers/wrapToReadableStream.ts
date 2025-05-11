import type { FileInputInterfaceStream } from "../types/FileInputInterfaceStream";

export interface ReadableStreamInit extends RequestInit {
  chunkSize?: number;
}

export const readableStreamInit: ReadableStreamInit = {
  chunkSize: 1024 * 1024,
  headers: {
    "Content-Type": "application/octet-stream",
  },
};

export async function wrapToReadableStream(
  inputStream: FileInputInterfaceStream,
  init: ReadableStreamInit = {}
): Promise<ReadableStream<Uint8Array>> {
  const mergedInit: ReadableStreamInit = {
    ...readableStreamInit,
    ...init,
  };

  return new Promise((resolve, reject) => {
    let input: FileInputInterfaceStream | undefined | null;
    try {
      input = inputStream;
      if (!input) {
        throw new Error("Failed to open file input stream");
      }
    } catch (error) {
      reject(error);
      return;
    }

    const abortHandler = () => {
      try {
        input?.close();
      } catch (error) {
        console.error("Error during abort cleanup:", error);
      }
      reject(new DOMException("The operation was aborted.", "AbortError"));
    };

    if (mergedInit.signal) {
      if (mergedInit.signal.aborted) {
        abortHandler();
        return;
      }
      mergedInit.signal.addEventListener("abort", abortHandler);
    }

    const stream = new ReadableStream({
      async pull(controller) {
        try {
          const chunkData = getChunkData(input, mergedInit.chunkSize);
          if (!chunkData) {
            controller.close();
            cleanup();
            return;
          }

          controller.enqueue(chunkData);
        } catch (error) {
          cleanup();
          controller.error(error);
          reject(new Error(`Error reading file chunk: ${error}`));
        }
      },
      cancel(reason) {
        console.warn("Stream canceled:", reason);
        cleanup();
      },
    });

    function cleanup() {
      try {
        if (mergedInit.signal) {
          mergedInit.signal.removeEventListener("abort", abortHandler);
        }
        input?.close();
      } catch (error) {
        console.error(`Error during cleanup: ${error}`);
      }
    }

    resolve(stream);
  });
}

function getChunkData(
  input: FileInputInterfaceStream,
  chunkSize?: number
): Uint8Array | null {
  try {
    const chunkData = chunkSize ? input.readChunk(chunkSize) : input.read();
    if (typeof chunkData === "number") {
      return new Uint8Array([chunkData]);
    } else if (typeof chunkData === "string") {
      const chunk = JSON.parse(chunkData);
      return chunk && Array.isArray(chunk) && chunk.length > 0
        ? new Uint8Array(chunk)
        : null;
    }
    return null;
  } catch (error) {
    throw new Error("Error reading chunk data: " + error);
  }
}
