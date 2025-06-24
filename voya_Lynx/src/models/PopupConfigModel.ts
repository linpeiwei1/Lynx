export class PopupConfigModel {
  store_id?: number;
  store_type?: number;
  title?: string;
  sub_title?: string;
  start_time?: number;
  end_time?: number;
  style?: { background?: string ,
    right_icon?:string,
    bottom_icon?:string,  
    buttom_text?: string,
    buttom_text_color?: string,
    products?:{back_icon?:string,tag_icon?:string,tag_color?:string};
    };

  link_url?: string;
  products?: Array<Product>;

  constructor(data: any) {
    Object.assign(this, data);
  }
} 
export class Product {
  product_id?: number;
  product_type?: string;
  tag?: string;
  back_icon?:string;
  tag_icon?:string;
  title?: string;
  sub_title?: string;
  ori_price?: number;
  price?: number;
  discount?: number;
  icon?: string;
  ani_url?: string;
  effective_duration?: number;
  constructor(data: any) {
    Object.assign(this, data);
  }
}
