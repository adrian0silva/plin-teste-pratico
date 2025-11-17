declare module 'pdfjs-dist/legacy/build/pdf.js' {
  import type {
    DocumentInitParameters,
    PDFDocumentLoadingTask,
    PDFDocumentProxy,
    TextContent,
    TextItem,
  } from 'pdfjs-dist/types/src/display/api';
  import type { TypedArray } from 'pdfjs-dist/types/src/display/api';
  import { GlobalWorkerOptions } from 'pdfjs-dist/types/src/display/worker_options';

  export { GlobalWorkerOptions };

  export type {
    PDFDocumentProxy,
    TextContent,
    TextItem,
  } from 'pdfjs-dist/types/src/display/api';

  export function getDocument(
    src:
      | string
      | URL
      | ArrayBuffer
      | TypedArray
      | number[]
      | DocumentInitParameters,
  ): PDFDocumentLoadingTask;
}

