declare module 'pdf-parse' {
  interface PdfInfo {
    Title?: string;
    Author?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
    [key: string]: any;
  }

  interface PdfData {
    numpages: number;
    numrender: number;
    info: PdfInfo;
    metadata: any;
    text: string;
    version: string;
  }

  function pdf(buffer: Buffer): Promise<PdfData>;

  export default pdf;
}
