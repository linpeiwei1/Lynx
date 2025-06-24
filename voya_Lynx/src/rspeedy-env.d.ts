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
    activity_popup_data?: string;
    popup_id?: string;
    server_time?: string;
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
    VY_LynxEventModule: {
      closeLynxView(popup_id: string): void;
      openScheme(url: string, popup_id: string): void;
      closeLynx(popup_id: string): void;
    };
  };
}