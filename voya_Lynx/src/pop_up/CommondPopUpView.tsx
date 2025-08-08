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
    // jsonStr = "{\"id\":1030,\"button_type\":2,\"scene\":[],\"top_img\":\"https:\\/\\/assets.voya.world\\/admin\\/20250716\\/68771a74907c79368771a74907c9.png\",\"title_key\":\"popupPreview_msg\",\"title_color\":\"#4887F6\",\"content_key\":\"popupPreview_msg\",\"content_color\":\"#FC8D0D\",\"button_key\":\"voiceRoom_theme15\",\"button_color\":\"\",\"border_color\":\"\",\"button_skip_url\":\"\",\"country_type\":0,\"country\":[],\"gender\":0,\"sort\":26,\"trigger_type\":0,\"trigger_interval_time\":1800,\"start_time\":1754611200,\"end_time\":1754784000,\"daily_limit\":300,\"total_limit\":10000,\"is_enable\":1,\"remark\":\"lllin\请\求\弹\窗\自\定\义\",\"restriction\":0,\"created_at\":\"2025-08-08 10:02:28\",\"updated_at\":\"2025-08-08 10:02:28\",\"ac_type\":0,\"ac_list\":\"\",\"popup_type\":1,\"pop_data\":{\"btn_style\":{\"url\":\"\",\"desc_key\":\"\",\"border_color\":\"\",\"background_color\":\"\"},\"txt_style\":{\"desc_key\":\"\",\"title_key\":\"\",\"desc_color\":\"\",\"title_color\":\"\",\"background_color\":\"\"},\"global_style\":{\"pic\":\"\",\"top_icon\":\"\",\"border_color\":\"\"}},\"trigger_cond\":1,\"style_type\":1,\"background_color\":\"#964DAB\",\"filter_cond\":{\"user_set\":{\"type\":0,\"uids\":[]},\"guild_set\":{\"type\":0},\"gender_set\":{\"gender\":0},\"country_set\":{\"type\":0,\"country_codes\":[]},\"coin_agent_set\":{\"type\":0},\"guild_leader_set\":{\"type\":0},\"user_reg_day_set\":{\"type\":0,\"reg_day\":0},\"ios_app_version_set\":{\"max\":\"\",\"min\":\"\"},\"android_app_version_set\":{\"max\":\"\",\"min\":\"\"},\"join_guild_set_duration_set\":{\"type\":0,\"duration\":0}},\"img_pop\":{\"url\":\"\",\"img_url\":\"\"},\"actions\":[\"home\",\"post\",\"me\"],\"guild_set\":0,\"delay\":0,\"background_border_color\":\"\",\"status\":1,\"title\":\"5min\后\活\动\开\始\\n\每\轮100,000\金\币\礼\物\等\你\拿\",\"content\":\"5min\后\活\动\开\始\\n\每\轮100,000\金\币\礼\物\等\你\拿\",\"button\":\"\�\�\活\动\",\"button_color_start\":\"#FC8D0D\",\"button_color_end\":\"#FC8D0D\",\"left_button\":{\"button_key\":\"\节\日\"}}";

    if (initData.activity_popup_data as string) {
        jsonStr = initData.activity_popup_data as string;
    }
    if (initData.popup_id as string) {
        popup_id = initData.popup_id as string;
    }
    var model:PopupCommondModelClass = PopupCommondModelClass.fromJsonString(jsonStr);
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

    console.log("model.top_img", model.top_img);
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
                    border: model.background_border_color ? '1px solid ' + model.background_border_color : 'none',
                    backgroundImage: 'linear-gradient(to bottom, ' + model.getGradientColor(model.background_color || '#FFFFFF') + ')', // 渐变
                }}>
                    <text style={{ fontSize: '16px', color: model.title_color || "#262626", textAlign: 'center', fontWeight: 'bold', marginTop: '68px', width: '100%', height: '24px' }}>{model.title}</text>
                    {/* 内容 */}
                    {/* 超出省略 换行 */}
                    <view style={{ width: '100%', height: '74px', padding: '0 16px' }}>
                        <text style={{ 
                            fontSize: '12px', 
                            color: model.content_color || "#262626",
                            textAlign: 'center', 
                            marginTop: '8px', 
                            width: '100%',
                            height: '100%',
                            lineHeight: '18px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',  
                            WebkitBoxOrient: 'vertical',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all'
                        }}>{model.content} </text>
                    </view>


                </view>

                <view style={{
                    width: '100%',
                    height: '150px',
                    position: 'absolute',
                    top: '0px',
                    left: '50%',
                    transform: 'translate(-50%, 0%)', 
                }}>
                    <image src={formatS3Image(model.top_img ?? "", 190, 150) || ""} style={{ width: '100%', height: '150px', objectFit: 'fill' }} />
                </view>
                {/* 左按钮 */}
                <BottomButton width={leftBtnWidth} left={'16px'} title={model.left_button?.button_key} color={model.getGradientColor(model.left_button?.border_color || '#FF0050')}
                    borderColor={model.left_button?.border_color} borderRadius={16} skipUrl={model.left_button?.url}
                    catchtap={() => {
                        openSchemeClick(model.left_button?.url || "");
                    }} />

                {/* 右按钮 */}
                <BottomButton width={leftBtnWidth} left={leftBtnMagin} title={model.button} color={model.getGradientColor(model.button_color || '#FF0050')}
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
            border: props.borderColor ? '1px solid ' + props.borderColor : 'none',
            backgroundImage: 'linear-gradient(to right, ' + props.color + ')', // 渐变
        }} catchtap={props.catchtap}>
            {/* 内容 */}
            <text style={{ fontSize: '16px', color: "#FFFFFF", textAlign: 'center', fontWeight: 'bold', width: '100%', height: '100%', lineHeight: '48px' }}>{props.title} </text>
        </view>
    );
}