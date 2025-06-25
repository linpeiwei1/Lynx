import { useCallback, useEffect, useState,useInitData } from '@lynx-js/react'
import { PopupConfigModel, Product } from './models/PopupConfigModel.js' 
import formatS3Image from './models/ReplaUrlImageModel.js';
import timerBack from "./assets/icon_timer_back.webp?inline";


export function ActivityPopup(props: {
  onMounted?: () => void
}) {
  const initData = useInitData();  
  const closeBtnClick = () => {
    NativeModules.VY_LynxEventModule.closeLynxView(popup_id); 
  };
  const closeIcon = "https://assets.voya.world/admin/20250607/684415df4306455684415df43067.png"
  console.log("closeIcon",formatS3Image(closeIcon || "",40,40));
  var popup_id = "";
  var jsonStr = ""; 
  // jsonStr =  "{\"store_id\":2011,\"store_type\":1,\"title\":\"\惊\喜\商\店\开\启\中\",\"sub_title\":\"\优\惠99%\",\"start_time\":1750578600,\"end_time\":1751068800,\"link_url\":\"voya:\\/\\/openpage?target=webview&url=https%3A%2F%2Fassets.voya.world%2Fweb%2Fweb-component-test%2Fpages%2F1750414098555.html%3Fsource%3Dlynxpop\",\"products\":[{\"product_id\":539,\"product_type\":\"AVATAR_DECOR\",\"tag\":\"\",\"title\":\"\",\"sub_title\":\"76%OFF\",\"ori_price\":1000,\"price\":233,\"discount\":76,\"icon\":\"https:\\/\\/assets.voya.world\\/admin\\/20250218\\/67b3ef75ed65c8667b3ef75ed65f.webp\",\"ani_url\":\"https:\\/\\/assets.voya.world\\/admin\\/20250218\\/67b3f07ce86148467b3f07ce8617.mp4\",\"effective_duration\":86400},{\"product_id\":258,\"product_type\":\"BAG_GIFT\",\"tag\":\"\",\"title\":\"\永\恆\之\心\",\"sub_title\":\"52%OFF\",\"ori_price\":39980,\"price\":19000,\"discount\":52,\"icon\":\"https:\\/\\/img.voya.world\\/gift_resource\\/icon\\/2022_12_27\\/phpN4hPEO-63aa9495841cc.png\",\"ani_url\":\"https:\\/\\/img.voya.world\\/gift_resource\\/animation\\/2022_12_27\\/phpMcZePN-63aa94959c575.mp4\",\"effective_duration\":86400},{\"product_id\":259,\"product_type\":\"BAG_GIFT\",\"tag\":\"\",\"title\":\"\水\晶\鞋\",\"sub_title\":\"33%OFF\",\"ori_price\":2980,\"price\":1980,\"discount\":33,\"icon\":\"https:\\/\\/img.voya.world\\/gift_resource\\/icon\\/2022_11_23\\/phpR3OaSX-637daa27bbe2e.png\",\"ani_url\":\"https:\\/\\/img.voya.world\\/gift_resource\\/animation\\/2022_12_26\\/phpO9CylQ-63a91ea4a58f4.mp4\",\"effective_duration\":86400}],\"style\":{\"right_icon\":\"https:\\/\\/assets.voya.world\\/admin\\/20250624\\/685a86df104f623685a86df104f7.webp\",\"background\":\"https:\\/\\/assets.voya.world\\/admin\\/20250620\\/6855364fc6a7596855364fc6a77.webp\",\"bottom_icon\":\"https:\\/\\/assets.voya.world\\/admin\\/20250624\\/685a9260627a28685a9260627a3.png\",\"buttom_text\":\"\去\抢\购\",\"buttom_text_color\":\"#FFFFFF\",\"products\":{\"back_icon\":\"https:\\/\\/assets.voya.world\\/admin\\/20250624\\/685a86df0f08510685a86df0f087.webp\",\"tag_icon\":\"https:\\/\\/assets.voya.world\\/admin\\/20250624\\/685a86df0f5c879685a86df0f5c9.webp\",\"tag_txt_color\":\"#FFFFFF\"}}}";
  

  if (initData.activity_popup_data as string){
    jsonStr = initData.activity_popup_data as string;
  }
  if (initData.popup_id as string){
    popup_id = initData.popup_id as string;
  } 
  
  const json = JSON.parse(jsonStr);
     
  const model = new PopupConfigModel(json);  

  useEffect(() => {     
    NativeModules.VY_LynxEventModule.lynxBuryingPoint("ACTIVITY_LYNXPOP_SHOW",{"activity_id":popup_id});   
  }, []); 
  
  return( 
    <view style={{width: '100%', height: '100%'}}>
      <view style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >
        <view style={{width: 'calc(100% - 46px)', height: '364px',
         position: 'absolute', top: '50%', left: '50%', 
           transform: 'translate(-50%, -50%)', borderRadius: '16px'}}> 
          
          <CenterView model={model} popup_id={popup_id}  /> 
          {/* 右上角 */}
          <view style={{
            width: '120px',
            height: '120px', 
            position: 'absolute',
            top: '0',
            right: '0'
          }} >
             <image 
              src = {formatS3Image(model.style?.right_icon || "",120,120) || ""}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </view> 
        </view>  
            
        {/* 关闭按钮 在上面视图底下42px的地方  */}
        <view style={{width:'40px',height: '40px',right: '12px',top: 'calc(100%/2 + 220px)',
        left: 'calc(100%/2 - 40px/2)',}} bindtap={closeBtnClick}> 
          <image src = {formatS3Image(closeIcon || "",40,40) || ""}
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

// 中间卡片视图
function CenterView(props: {
  model: PopupConfigModel,
  popup_id: string
}) {
  const title = props.model.title ?? ""
  const backIcon = props.model.style?.background ?? ""
  const bottomBtn = props.model.style?.bottom_icon ?? ""
  const bottomBtnText = props.model.style?.buttom_text ?? ""
  const bottomBtnTextColor = props.model.style?.buttom_text_color ?? ""
 
  const handleBottomBtnClick = () => { 
    NativeModules.VY_LynxEventModule.lynxBuryingPoint("ACTIVITY_LYNXPOP_CLICK",{"activity_id":props.popup_id});  
    NativeModules.VY_LynxEventModule.openScheme(props.model.link_url ?? "",props.popup_id);  
  }; 
  const topColor = props.model.store_type == 1 ? "#FE5C3F" : "#5331AB" 
  return (
    <view style={{width:"100%", height:"calc(100% - 54px)",
      position: 'absolute',borderRadius: '16px',
      top: '54px',
      background: `linear-gradient(to bottom, ${topColor} 0%, #F7F7F7 100%)`}}>
        2个颜色渐变 从上到下
        <image 
          src = {formatS3Image(backIcon || "",400,400) || ""}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            objectFit: 'cover'
          }}  />
       {/* 左上角文本 */}
      <text style={{position: 'absolute',height:'24px', top: '12px', left: '12px',fontSize: '16px',fontWeight: '900',color:'white', textOverflow: 'ellipsis',overflow: 'hidden'}}>{title}</text>
       {/* 倒计时 */}
       <view style={{position: 'absolute',top:"34px",left:"12px",height:'24px'}}><StartCountdown model={props.model} /></view>
  
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
        <CenterViewItem model={props.model.products?.[0]} backIcon={props.model.style?.products?.back_icon} tagIcon={props.model.style?.products?.tag_icon} tagColor={props.model.style?.products?.tag_color} storeType={props.model.store_type ?? 0}  />
        {props.model.products?.[1] != null && <CenterViewItem model={props.model.products?.[1]} backIcon={props.model.style?.products?.back_icon} tagIcon={props.model.style?.products?.tag_icon} tagColor={props.model.style?.products?.tag_color} storeType={props.model.store_type ?? 0} /> } 
        {props.model.products?.[2] != null && <CenterViewItem model={props.model.products?.[2]} backIcon={props.model.style?.products?.back_icon} tagIcon={props.model.style?.products?.tag_icon} tagColor={props.model.style?.products?.tag_color} storeType={props.model.store_type ?? 0} /> } 
      </view>

      {/* 底部按钮 */}
      <view style={{position: 'absolute', width:'281px',height: '64px',bottom: '24px', left: 'calc(100%/2 - 281px/2)'}} 
        bindtap={handleBottomBtnClick}>
        <image 
          src = {formatS3Image(bottomBtn || "",281,64) || ""}
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

// 计时器组件
function StartCountdown(props: {
  model: PopupConfigModel 
}) {
  const backIcon = "https://assets.voya.world/admin/20250624/685a5af3d153d12685a5af3d1540.webp"
  const initData = useInitData(); 
  var server_time =  Date.now() / 1000; 
  // 获取UTC-0时区时间戳
 
  if (initData.server_time as string){
    server_time = Number(initData.server_time);
  } 
  var serverTime = (props.model.end_time ?? 0) - Number(server_time);  // 计算服务器时间戳与当前时间戳的差值

  const [count, setCount] = useState(["","","",""]);

  const countdown = new Countdown(serverTime, () => {
    console.log('Countdown complete!');
  }, (time: number) => {  
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    //毫秒
    var milliseconds = Math.floor((time % 1) * 100);
    milliseconds += Math.floor(Math.random() * 10);
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    setCount(formattedTime.split(":"));
  });
  useEffect(() => {
    countdown.start();
    return () => {
      countdown.stop();
    };
  }, []);
 
  return (
    <view style={{width:'120px',height:'25px'}}>

      <view style={{position: 'absolute',top: '0',left: '0',width: '100%',height: '100%',display: 'flex',flexDirection: 'row',justifyContent: 'center'}}> 

        <image  src = {timerBack}  style={{width: '25px',height: '25px'}}>
          <text style={{ color:'#220954',fontSize: '12px',textAlign: 'center',lineHeight: '25px'}}>{count[0]}</text> 
        </image>

        <text style={{ color:'white',fontSize: '12px',textAlign: 'center',lineHeight: '25px',width:'10px'}}>:</text> 

        <image src = {timerBack}  style={{width: '25px',height: '25px'}}>
          <text style={{ color:'#220954',fontSize: '12px',textAlign: 'center',lineHeight: '25px'}}>{count[1]}</text> 
        </image>

        <text style={{ color:'white',fontSize: '12px',textAlign: 'center',lineHeight: '25px',width:'10px'}}>:</text> 

        <image src = {timerBack} style={{width: '25px',height: '25px'}}>
          <text style={{ color:'#220954',fontSize: '12px',textAlign: 'center',lineHeight: '25px'}}>{count[2]}</text> 
        </image>

        <text style={{ color:'white',fontSize: '12px',textAlign: 'center',lineHeight: '25px',width:'10px'}}>:</text> 

        <image src = {timerBack}  style={{width: '25px',height: '25px'}}>
         <text style={{ color:'#220954',fontSize: '12px',textAlign: 'center',lineHeight: '25px'}}>{count[3]}</text> 
        </image>
        
      </view> 
    </view>
  )
}

// 中间卡片视图子项
function CenterViewItem(props: {
  model?: Product,
  storeType: number,
  backIcon?:string,
  tagColor?:string, 
  tagIcon?:string
}) {
  const backIcon = props.backIcon ?? ""
  const tagIcon = props.tagIcon ?? ""
  const tagText = props.model?.sub_title ?? ""
  if (props.storeType == 1){
    props.tagColor = "white";
  } 
  const iconCoint = "https://assets.voya.world/admin/20250620/68553c18782eb3868553c18782ee.webp"
   console.log("formatS3Image hhh",formatS3Image(props.model?.icon || "",64,64,1));
  return (
    <view style={{width: '102px',height: '100%'}}>
       <image 
          src = {formatS3Image(backIcon || "",102,100) || ""}
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
            <image src = {formatS3Image(tagIcon || "",70,20) || ""} style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
            }}/>
            <text   style={{
                position: 'absolute', 
                width: '70px',
                height: '20px',
                fontSize: '13px', 
                fontWeight: 'bold',
                color: props.tagColor ?? '#562A00',
                textAlign: 'center',
                lineHeight: "20px",
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }} >{tagText}</text>
          </view>)} 
          {/* 大小为64px居中的视图 */}
          {props.storeType == 1 && (
            <view style={{width: '64px',height: '64px',position: 'absolute',top: '26px',left: 'calc(100%/2 - 64px/2)'}}>
            <image src = {formatS3Image(props.model?.icon ?? "",64,64) ?? ""} style={{
                width: '100%',
                height: '100%', 
                objectFit: 'cover'
              }}/>
          </view>
          )}
          {props.storeType != 1 && (
             <view style={{width: '64px',height: '64px',position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}}>
             <image src = {formatS3Image(props.model?.icon ?? "",64,64) ?? ""  } style={{
                 width: '100%',
                 height: '100%', 
                 objectFit: 'cover'
               }}/>
           </view>
          )}

      {props.storeType == 1 && (
         <view style={{position: 'absolute',bottom: '0',width:'100%',height:'40px',display: 'flex',flexDirection: 'column',justifyContent: 'end',alignItems: 'center'}}> 
          <text style={{ position: 'absolute',top:'0',width: '100%',height: '17px',color:'white',fontSize: '12px',textAlign: 'center' ,lineHeight:'100%',textDecoration: 'line-through'}}>{props.model?.ori_price}</text> 
          <view style={{position: 'absolute',bottom:'12px',width: '100%',height: '18px',display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>  
            <image src = {formatS3Image(iconCoint || "",8,8) || ""} style={{width: '8px',height: '8px',alignSelf: 'center'}}/> 
            <text style={{ color:'white',fontSize: '12px',textAlign: 'center' ,lineHeight:'18px',marginLeft:'2px'}}>{props.model?.price}</text> 
        </view>
     </view>
      )}
     
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

// 滚动文本组件
function ScrollingText(props: {
  text: string;
  style?: any;
  speed?: number;
  delay?: number;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const speed = props.speed || 50; // 滚动速度 (px/s)
  const delay = props.delay || 2000; // 延迟时间 (ms)
  
  useEffect(() => {
    // 更精确的文本宽度估算
    const fontSize = props.style?.fontSize || 16;
    const fontWeight = props.style?.fontWeight || 'normal';
    
    // 根据字体大小和粗细估算字符宽度
    let charWidth = fontSize * 0.6; // 基础字符宽度
    if (fontWeight === 'bold' || fontWeight === '900') {
      charWidth *= 1.2; // 粗体字符更宽
    }
    
    const estimatedTextWidth = props.text.length * charWidth;
    
    // 从样式中获取容器宽度
    const style = props.style || {};
    let estimatedContainerWidth = 200; // 默认宽度
    
    if (style.width) {
      if (typeof style.width === 'string' && style.width.includes('calc')) {
        // 处理 calc() 表达式
        estimatedContainerWidth = 200; // 简化处理
      } else if (typeof style.width === 'number') {
        estimatedContainerWidth = style.width;
      } else if (typeof style.width === 'string' && style.width.includes('px')) {
        estimatedContainerWidth = parseInt(style.width);
      }
    }
    
    setTextWidth(estimatedTextWidth);
    setContainerWidth(estimatedContainerWidth);
    setShouldScroll(estimatedTextWidth > estimatedContainerWidth);
  }, [props.text, props.style]);
  
  useEffect(() => {
    if (!shouldScroll) return;
    
    let timeoutId: NodeJS.Timeout;
    let animationId: number;
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const scrollDistance = (elapsed / 1000) * speed;
      
      if (scrollDistance >= textWidth + delay) {
        // 滚动完成，重置位置
        setScrollPosition(0);
        startTime = currentTime;
      } else {
        setScrollPosition(-scrollDistance);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // 延迟开始滚动
    timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [shouldScroll, textWidth, speed, delay]);
  
  if (!shouldScroll) {
    return <text style={props.style}>{props.text}</text>;
  }
  
  return (
    <view style={{
      overflow: 'hidden',
      ...props.style,
      position: 'relative'
    }}>
      <text style={{
        position: 'absolute',
        whiteSpace: 'nowrap',
        transform: `translateX(${scrollPosition}px)`,
        ...props.style
      }}>
        {props.text}
      </text>
    </view>
  );
}

// 跑马灯文本组件 (连续滚动)
function MarqueeText(props: {
  text: string;
  style?: any;
  speed?: number;
  delay?: number;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const speed = props.speed || 30; // 滚动速度 (px/s)
  const delay = props.delay || 1000; // 延迟时间 (ms)
  
  useEffect(() => {
    // 文本宽度估算
    const fontSize = props.style?.fontSize || 16;
    const fontWeight = props.style?.fontWeight || 'normal';
    
    let charWidth = fontSize * 0.6;
    if (fontWeight === 'bold' || fontWeight === '900') {
      charWidth *= 1.2;
    }
    
    const estimatedTextWidth = props.text.length * charWidth;
    const style = props.style || {};
    let estimatedContainerWidth = 200;
    
    if (style.width) {
      if (typeof style.width === 'string' && style.width.includes('calc')) {
        estimatedContainerWidth = 200;
      } else if (typeof style.width === 'number') {
        estimatedContainerWidth = style.width;
      } else if (typeof style.width === 'string' && style.width.includes('px')) {
        estimatedContainerWidth = parseInt(style.width);
      }
    }
    
    setTextWidth(estimatedTextWidth);
    setContainerWidth(estimatedContainerWidth);
    setShouldScroll(estimatedTextWidth > estimatedContainerWidth);
  }, [props.text, props.style]);
  
  useEffect(() => {
    if (!shouldScroll) return;
    
    let timeoutId: NodeJS.Timeout;
    let animationId: number;
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const scrollDistance = (elapsed / 1000) * speed;
      
      // 连续滚动：当文本完全移出容器时，从右侧重新开始
      if (scrollDistance >= textWidth) {
        setScrollPosition(containerWidth);
        startTime = currentTime;
      } else {
        setScrollPosition(containerWidth - scrollDistance);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [shouldScroll, textWidth, containerWidth, speed, delay]);
  
  if (!shouldScroll) {
    return <text style={props.style}>{props.text}</text>;
  }
  
  return (
    <view style={{
      overflow: 'hidden',
      ...props.style,
      position: 'relative'
    }}>
      <text style={{
        position: 'absolute',
        whiteSpace: 'nowrap',
        transform: `translateX(${scrollPosition}px)`,
        ...props.style
      }}>
        {props.text}
      </text>
    </view>
  );
}