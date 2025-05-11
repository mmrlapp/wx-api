import type { FileInputInterfaceStream } from "../types/FileInputInterfaceStream";
import {
  readableStreamInit,
  wrapToReadableStream,
  type ReadableStreamInit,
} from "./wrapToReadableStream";

export async function wrapInputStream(
  inputStream: FileInputInterfaceStream,
  init: ReadableStreamInit = {}
): Promise<Response> {
  const mergedInit: ReadableStreamInit = {
    ...readableStreamInit,
    ...init,
  };

  try {
    const stream = await wrapToReadableStream(inputStream, mergedInit);
    return new Response(stream, mergedInit);
  } catch (error) {
    throw new Error(`wrapInputStream failed: ${error}`);
  }
}
