import { useCallback, useEffect, useState,useInitData } from '@lynx-js/react'
import { PopupConfigModel, Product } from './models/PopupConfigModel.js' 
export function ActivityPopup(props: {
  onMounted?: () => void
}) {
  const initData = useInitData();  
  const closeBtnClick = () => {
    NativeModules.VY_LynxEventModule.closeLynxView(popup_id); 
  };
  var popup_id = "";
  var jsonStr = "";
  var server_time = "";
  if (initData.activity_popup_data as string){
    jsonStr = initData.activity_popup_data as string;
  }
  if (initData.popup_id as string){
    popup_id = initData.popup_id as string;
  } 
  if (initData.server_time as string){
    server_time = initData.server_time as string;
  }
  console.log("jsonStr",jsonStr);
  console.log("popup_id",popup_id);
  const json = JSON.parse(jsonStr); 
 
     
  const model = new PopupConfigModel(json);

  const closeIcon = "https://assets.voya.world/admin/20250607/684415df4306455684415df43067.png"

  return( 
    <view style={{width: '100%', height: '100%'}}>
      <view style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} bindtap={closeBtnClick} >
        <view style={{width: 'calc(100% - 46px)', height: '340px',
         position: 'absolute', top: '50%', left: '50%', 
           transform: 'translate(-50%, -50%)', borderRadius: '16px',color:'white'}}> 
          
          <CenterView model={model} popup_id={popup_id} server_time={server_time} /> 
          {/* 右上角 */}
          <view style={{
            width: '120px',
            height: '120px', 
            position: 'absolute',
            top: '0',
            right: '0'
          }} >
             <image 
              src = {model.style?.right_icon ?? ""}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </view> 
        </view>  
            
        {/* 关闭按钮 在上面视图底下42px的地方  */}
        <view style={{width:'40px',height: '40px',bottom: '42px', right: '12px',top: 'calc(100%/2 + 220px)',
        left: 'calc(100%/2 - 40px/2)',}} bindtap={closeBtnClick}> 
          <image src = {closeIcon}
          style={{
            width: '24px',
            height: '24px',
            objectFit: 'cover'
            }
          }/>
      </view>
      </view>

    </view>
   
  )
}

function CenterView(props: {
  model: PopupConfigModel,
  popup_id: string,
  server_time: string
}) {
  const title = props.model.title ?? ""
  const backIcon = props.model.style?.background ?? ""
  const bottomBtn = props.model.style?.bottom_icon ?? ""
  const bottomBtnText = props.model.style?.buttom_text ?? ""
  const bottomBtnTextColor = props.model.style?.buttom_text_color ?? ""
  const handleBottomBtnClick = () => {
    NativeModules.VY_LynxEventModule.openScheme(props.model.link_url ?? "",props.popup_id); 
    // NativeModules.VY_LynxEventModule.closeLynx(props.popup_id); 
  };

  const [count, setCount] = useState(0)
  const countdown = new Countdown(60, () => {
    console.log('Countdown complete!');
  }, (time: number) => {
    console.log(`Time remaining: ${time}`);
    setCount(time);
  });
  if (count == 60) {
    // countdown.start();
  }
  
  return (
    <view style={{width:"100%", height:"calc(100% - 54px)",
      position: 'absolute',borderRadius: '16px',
      top: '54px'}}>
        <image 
          src = {backIcon}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            objectFit: 'cover'
          }}
        />
       {/* 左上角文本 */}
      <text style={{position: 'absolute',height:'24px', top: '12px', left: '12px',fontSize: '16px',fontWeight: '900',color:'white', textOverflow: 'ellipsis',overflow: 'hidden'}}>{title}</text>
       {/* 60秒倒计时 */}
      <text style={{position: 'absolute', top: '36px', left: '12px',color:'white'}}>{props.server_time}</text>

      {/* 三个CenterViewItem容器 */}
      <view style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: '134px',
        top: '69px',
        justifyContent: 'space-around',
        alignItems: 'center',
        left: '8px',

      }}>
        <CenterViewItem model={props.model.products?.[0]} backIcon={props.model.style?.products?.back_icon} tagIcon={props.model.style?.products?.tag_icon} />
        <CenterViewItem model={props.model.products?.[1]} backIcon={props.model.style?.products?.back_icon} tagIcon={props.model.style?.products?.tag_icon} />
        <CenterViewItem model={props.model.products?.[2]} backIcon={props.model.style?.products?.back_icon} tagIcon={props.model.style?.products?.tag_icon} />
      </view>

      {/* 底部按钮 */}
      <view style={{position: 'absolute', width:'281px',height: '64px',bottom: '0px', left: 'calc(100%/2 - 281px/2)'}} 
        bindtap={handleBottomBtnClick}>
        <image 
          src = {bottomBtn}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        > 
        <text style={{fontSize: '16px', fontWeight: 'bold',color: bottomBtnTextColor,whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',overflow: 'hidden',textAlign: 'center',lineHeight: '48px'}}>{bottomBtnText}</text>
        </image> 
      </view>
    </view>
  )
}
function CenterViewItem(props: {
  model?: Product,
  backIcon?:string,
  tagIcon?:string
}) {
  const backIcon = props.backIcon ?? ""
  const tagIcon = props.tagIcon ?? ""
  const tagText = props.model?.tag ?? ""
  return (
    <view style={{width: '102px',height: '100%'}}>
       <image 
          src = {backIcon}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* 标签 */} 
        {tagText !== "" && (<view style={{position: 'absolute',
            top: '4px',
            left: '16px',            
            width: '70px',
            height: '20px'}}>
            <image src = {tagIcon} style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
            }}/>
            <text style={{position: 'absolute', width: '100%',height: '100%',fontSize: '13px', fontWeight: 'bold',color: '#562A00',
            textOverflow: 'ellipsis',overflow: 'hidden',textAlign: 'center',lineHeight:"20px"}}>{tagText}</text>
          </view>)} 
          {/* 大小为74px居中的圆形视图 */}
      <view style={{width: '74px',height: '74px',borderRadius: '50%',position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}}>
        <image src = {props.model?.icon ?? ""} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}/>
      </view>

    </view>
  )
}

class Countdown {
  private seconds: number;
  private interval: number;
  private timer: NodeJS.Timeout | null;
  private onComplete: () => void;
  private onTick: (time: number) => void;

  constructor(seconds: number, onComplete: () => void, onTick: (time: number) => void) {
    this.seconds = seconds;
    this.interval = 100;
    this.timer = null;
    this.onComplete = onComplete;
    this.onTick = onTick;
  }

  start() {
    if (this.timer) return;
    
    this.timer = setInterval(() => {
      this.seconds -= 0.1;
      if (this.seconds <= 0) {
        this.stop();
        this.onComplete();
        return;
      }
      this.onTick(this.seconds);
    }, this.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getTime() {
    return Math.max(0, Math.ceil(this.seconds));
  }
}