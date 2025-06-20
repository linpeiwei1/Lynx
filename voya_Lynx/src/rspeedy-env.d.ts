/// <reference types="@lynx-js/rspeedy/client" />

declare namespace JSX {
  interface IntrinsicElements {
    view: {
      style?: any;
      bindtap?: () => void;
    };
    text: {
      style?: any;
    };
    input: {
      type?: string;
      bindinput?: (e: { detail: { value: string } }) => void;
      value?: string;
      placeholder?: string;
    };
  }
}

declare namespace Lynx { 
  interface InitData {
    global_data?: string;
    message: string;
  }
  const __initData: InitData;
  
}

declare namespace lynx {
  interface GlobalProps {
    preferredTheme?: string;
    isNotchScreen?: boolean;
    globalData?: string;
  }
  const __globalProps: GlobalProps;
  const __initData: Lynx.InitData;
  
  
}

declare global {
  declare module '*.png?inline';

  declare let NativeModules: {
    ExplorerModule: { 
      openSchema(url: string): void; 
    };
  };
}