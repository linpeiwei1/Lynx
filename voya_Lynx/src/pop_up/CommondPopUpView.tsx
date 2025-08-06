// import formatS3Image from "../models/ReplaUrlImageModel.jsx";
import { PopupCommondModelClass } from '../models/PopupCommondModel.js';
import formatS3Image from '../models/ReplaUrlImageModel.js';
import { useInitData } from '@lynx-js/react'



// 全屏视图组件
export function CommondPopUpView(props: {
}) {
    const initData = useInitData();
    var popup_id = "";
    var jsonStr = "";
    // jsonStr = "{\"button_type\":1,\"background_color\":\"\",\"background_border_color\":\"\",\"top_img\":\"https:\\/\\/assets.voya.world\\/admin\\/20250605\\/68418029e630a9468418029e630d.png\",\"title\":\"\标\题\",\"title_color\":\"\",\"content\":\"\内\容\",\"content_color\":\"\",\"button\":\"\�\�\活\动\",\"button_color\":\"#FE538A,#FFFFFF\",\"border_color\":\"#FFFFFF\",\"button_skip_url\":\"https:\\/\\/www.baidu.com\",\"left_button\":null}";

    if (initData.activity_popup_data as string) {
        jsonStr = initData.activity_popup_data as string;
    }
    if (initData.popup_id as string) {
        popup_id = initData.popup_id as string;
    }
    const model = PopupCommondModelClass.fromJsonString(jsonStr);
    var leftBtnEnabel = false;
    var leftBtnMagin = '16px';
    var leftBtnWidth = 'calc(100% - 16px*2)';
    if (model.left_button) {
        leftBtnEnabel = true;
        leftBtnWidth = 'calc((100% - 16px*3)/2)';
        leftBtnMagin = 'calc((100% - 16px*3)/2 + 16px + 16px)';
    }

    const closeBtnClick = () => {
        NativeModules.VY_LynxEventModule.closeLynxView(popup_id);
    };
    const openSchemeClick = (url: String) => {

        console.log("openSchemeClick", popup_id);
        NativeModules.VY_LynxEventModule.openScheme(url, popup_id);
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
            zIndex: 1000,
        }} >


            {/* 以下View的点击事件拦截底部View的点击事件 */}
            <view style={{
                width: 'calc(100% - 84px)',
                height: '340px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>

                <view style={{
                    width: '100%',
                    height: '250px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: '0px',
                    border: '1px solid ' + model.background_border_color || 'none',
                    backgroundImage: 'linear-gradient(to bottom, ' + model.getGradientColor(model.background_color || '#FFFFFF') + ')', // 渐变
                }}>
                    <text style={{ fontSize: '16px', color: model.title_color || "#262626", textAlign: 'center', fontWeight: 'bold', marginTop: '68px', width: '100%', height: '24px' }}>{model.title}</text>
                    {/* 内容 */}
                    <text style={{ fontSize: '12px', color: model.content_color || "#262626", textAlign: 'center', marginTop: '8px', left: '16px', right: "16px", width: 'calc(100% - 32px)', lineHeight: '74px' }}>{model.content}</text>


                </view>

                <view style={{
                    width: '190px',
                    height: '150px',
                    position: 'absolute',
                    top: '0px',
                    left: '50%',
                    transform: 'translate(-50%, 0%)'
                }}>
                    <image src={formatS3Image(model.top_img ?? "", 150, 150) || ""} style={{ width: '100%', height: '150px', objectFit: 'conver' }} />
                </view>
                {/* 左按钮 */}
                <BottomButton width={leftBtnWidth} left={'16px'} title={model.left_button?.button_key} color={model.getGradientColor(model.left_button?.border_color || '')}
                    borderColor={model.left_button?.border_color} borderRadius={16} skipUrl={model.left_button?.url}
                    catchtap={() => {
                        openSchemeClick(model.left_button?.url || "");
                    }} />

                {/* 右按钮 */}
                <BottomButton width={leftBtnWidth} left={leftBtnMagin} title={model.button} color={model.getGradientColor(model.button_color || '')}
                    borderColor={model.border_color} borderRadius={16} skipUrl={model.button_skip_url}
                    catchtap={() => {
                        openSchemeClick(model.button_skip_url || "");
                    }} />



            </view>
            {/* 关闭按钮 在上面视图底下42px的地方  */}
            <view style={{
                width: '40px', height: '40px', right: '12px', top: 'calc(100%/2 + 220px)',
                left: 'calc(100%/2 - 40px/2)', position: 'absolute'
            }}bindtap={closeBtnClick}>
                <image src={formatS3Image(closeIcon || "", 40, 40) || ""} style={{ width: '24px', height: '24px', objectFit: 'cover' }} />
            </view>
        </view>
    );
}
function BottomButton(props: {
    width: string,
    left: | string,
    title?: string,
    color?: string,
    borderColor?: string,
    borderRadius?: number,
    skipUrl?: string,
    catchtap?: () => void,
}) {
    return (
        <view style={{
            position: 'absolute',
            bottom: '16px',
            width: props.width,
            height: '48px',
            left: props.left,
            borderRadius: '16px',
            border: '1px solid ' + props.borderColor || 'none',
            backgroundImage: 'linear-gradient(to right, ' + props.color + ')', // 渐变
        }} catchtap={props.catchtap}>
            {/* 内容 */}
            <text style={{ fontSize: '16px', color: "#FFFFFF", textAlign: 'center', fontWeight: 'bold', width: '100%', height: '100%', lineHeight: '48px' }}>{props.title} </text>
        </view>
    );
}