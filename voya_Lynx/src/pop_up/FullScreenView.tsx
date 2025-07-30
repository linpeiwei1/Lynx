// import formatS3Image from "../models/ReplaUrlImageModel.jsx";
import formatS3Image from '../models/ReplaUrlImageModel.js';
import { useInitData } from '@lynx-js/react'



// 全屏视图组件
export function FullScreenView(props: {
}) {
    const initData = useInitData();
    var popup_id = "";
    var jsonStr = "{}";
    // jsonStr = "{\"img_url\":\"https:\\/\\/assets.voya.world\\/admin\\/20250218\\/67b3ef75ed65c8667b3ef75ed65f.webp\",\"url\":\"http:\\/\\/sssss\"}";

    if (initData.activity_popup_data as string) {
        jsonStr = initData.activity_popup_data as string;
    }
    if (initData.popup_id as string) {
        popup_id = initData.popup_id as string;
    }
    const json = JSON.parse(jsonStr);
    const iconURL = json["img_url"] as string ?? "";
    const schemeURL = json["url"] as string ?? "";

    const closeBtnClick = () => { 
        NativeModules.VY_LynxEventModule.closeLynxView(popup_id);  
    };
    const openSchemeClick = () => {
 
        NativeModules.VY_LynxEventModule.openScheme(schemeURL,popup_id);  
    };
    const closeIcon = "https://assets.voya.world/admin/20250729/68887b941bfea068887b941bfed.webp"


    return (
        <view style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }} bindtap={closeBtnClick}>
            {/* 以下View的点击事件拦截底部View的点击事件 */}
            <view style={{
                width: '290px',
                height: '364px', 
                overflow: 'hidden', 
            }} catchtap={() => {
                // 使用 catchtap 阻止事件冒泡
                openSchemeClick();
            }}>
                <image
                    src={formatS3Image(iconURL || "", 290, 364) || ""}
                    style={{
                        width: '100%',
                        height: '100%',  
                        objectFit: 'cover' // 或改为 'contain' 如果需要完整显示图片
                    }}
                />
            </view>
            {/* 关闭按钮 在上面视图底下42px的地方  */}
            <view style={{
                width: '40px', height: '40px', right: '12px', top: 'calc(100%/2 + 220px)',
                left: 'calc(100%/2 - 40px/2)', position: 'absolute'
            }}>
                <image src={formatS3Image(closeIcon || "", 40, 40) || ""} style={{ width: '24px', height: '24px', objectFit: 'cover' }} />
            </view>
        </view>
    );
}