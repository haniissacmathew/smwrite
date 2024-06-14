// global.d.ts
export {};

declare global {
  interface Window {
    electron: {
      onEventFromMain: (callback: (event: any, data: any) => void) => void;
    };
  }
}
