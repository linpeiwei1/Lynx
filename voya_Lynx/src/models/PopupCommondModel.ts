// PopupCom 

export class PopupCommondModelClass   {
  button_type?: number;
  background_color?: string;
  background_border_color?: string;
  top_img?: string;
  title?: string;
  title_color?: string;
  content?: string;
  content_color?: string;
  button?: string;
  button_color?: string;
  button_color_start?: string;
  button_color_end?: string;
  border_color?: string;
  button_skip_url?: string;
  left_button?: LeftButton;

  constructor(data: any = {}) {
    this.button_type = data.button_type;
    this.background_color = data.background_color;
    this.background_border_color = data.background_border_color;
    this.top_img = data.top_img;
    this.title = data.title;
    this.title_color = data.title_color;
    this.content = data.content;
    this.content_color = data.content_color;
    this.button = data.button;
    this.button_color = data.button_color;
    this.button_color_start = data.button_color_start;
    this.button_color_end = data.button_color_end;
    this.border_color = data.border_color;
    this.button_skip_url = data.button_skip_url;
    this.left_button = data.left_button;
  }
  getGradientColor(color:string): string {
    if (color.includes(',')){
      return color;
    }
    return color + "," + color; 
  } 

  // 从JSON字符串创建模型实例
  static fromJsonString(jsonStr: string): PopupCommondModelClass {
    try {
      const data = JSON.parse(jsonStr);
      return new PopupCommondModelClass(data);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return new PopupCommondModelClass({});
    }
  }
}
export interface LeftButton {
    button_key?: string;
    button_color?: string;
    border_color?: string;
    url?: string;
    button_color_start?: string;
    button_color_end?: string;
  }