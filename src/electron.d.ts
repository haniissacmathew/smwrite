declare global {
    interface Window {
      electron: {
        ipcRenderer: {
          send(channel: string, ...args: any[]): void;
          on(channel: string, listener: (...args: any[]) => void): void;
          once(channel: string, listener: (...args: any[]) => void): void;
          removeAllListeners(channel: string): void;
        };
        createFile(filePath: string, content: string):void;
        selectFolder(): string[];
        saveFile(content: string): { success: boolean; error?: string };
      };
    }
  }
  
  export {};
  