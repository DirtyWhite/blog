interface option {
    /** 是否自动调用升级*/
    isUpgrade?: boolean
    /**是否启动调试模式，是则报错时会alert */
    isAlert?: boolean
    /**基础事件处理 配置callback回调执行 */
    baseCkFun?: Function
}
interface emt {
    navigator: string
    userAgent: string
    /**游拍获取版本号的正则 */
    _reg: string
    version: string
    isWebkit: boolean
    isSafari: boolean
    isYoupai: boolean
    isYouxihe: boolean
    isIos: boolean
    isIDevice: boolean
    isAndroid: boolean
    isWechat: boolean
    isTouTiao: boolean
}
interface YpJsToPlayVideoParam {
    id: number
    videoName: string
    videoPath: string
    videoPic: string
    gameName: string
}

/**新游拍接口 */
declare class YpProDefinit {
    constructor(option: option)
    /** */
    emt: () => emt
    /**跳转视频播放页 */
    YpJsToPlayVideo: (jsonData: YpJsToPlayVideoParam) => void
    /**跳转游戏合集分类页 */
    YpJsToGameTab: (jsonData: { id: number }) => void
    /**
     * 游戏合集大分类页
     * type 1手游 2端游 3综合 缺省值为1 
     */
    YpJsToGameClass: (jsonData: { type: number }) => void
    /**     
     * 视频分类页
     */
    YpJsToVideoTab: (jsonData: { id: number }) => void
    /**
     * 上传视频页
     * channel test_activity活动标识
     */
    YpJsToUploadVideo: (jsonData: { channel: string }) => void
    /**
     * 意见反馈页
     * type 1常见问题与反馈 2反馈记录（子页，聊天列表） 缺省值为1
     */
    YpJsToFeedback: (jsonData: { type: number }) => void
    /**
     * 个人主页
     * id 用户id
     */
    YpJsToPersonalPage: (jsonData: { id: string }) => void
    /**
     * 玩家个人资料页
     * showAuthInfo 是否展示认证信息文案 0隐藏 1显示
     */
    YpJsToPersonalInfo: (jsonData: { showAuthInfo: number }) => void
    /**
     * 搜索页
     */
    YpJsToSearch: (jsonData: { keyword: string }) => void
    /**
     * 私信页
     */
    YpJsToChat: (jsonData: { id: string, userNick: string, avatar: string }) => void
    /**
     * 充值页
     * type 页面类型 0充值页/充值首页 1充值子页（立即充值页） 缺省值为0
     * money type=1时可传
     */
    YpJsToRecharge: (jsonData?: { type?: number, money?: number }) => void
    /**
     * 直播列表页
     * id 游戏模块为游戏id 自定义模块为模块id
     * type 1自定义模块 2游戏模块 缺省值为2
     * title 标题
     */
    YpJsToLiveList: (jsonData?: { id: number, type?: number, title: string }) => void
    /**
     * 直播播放页
     */
    YpJsToLivePage: (jsonData: { roomId: string }) => void
    /**
     * "开启直播"页
     */
    YpJsToOpenLivePage: () => void
    /**直播设置页 */
    YpJsToLiveSetting: () => void
    /**关注的主播页 */
    YpJsToFollowAnchor: () => void
    /**
     * 开通守护页
     */
    YpJsToGuardianBuy: (jsonData: { anchorId: string }) => void
    /**
     * 直播守护页
     * type 页面类型 0守护的主播页 1守护管理页 缺省值为0
     */
    YpJsToGuardian: (jsonData: { type?: number }) => void
    /**
     * toast
     * gravity toast位置 0底部居中 1正中 2上方居中 缺省值为0
     */
    YpJsToToast: (jsonData: { msg: string, gravity?: number }) => void
    /**关闭活动页 */
    YpJsToClose: () => void
    /**检查新版本 */
    YpJsToUpdate: () => void
    /**
     * 分享-标题栏按钮
     */
    YpJsToShare: () => Promise<{ isSuccess: number }>
    /**
     * 分享-前端自定义
     * singleChannel 单渠道分享 1qq 2qq空间 3微信 4朋友圈 5新浪微博 6复制链接
     */
    YpJsToCustomShare: (jsonData: { title: string, content: string, iconUrl: string, redirectUrl: string, singleChannel?: number }) => Promise<{ isSuccess: number }>
    /**
     * 分享视频到游戏盒动态
     */
    YpJsToGameCenterShare: (jsonData: { id: number, title: string, anthor: string, pic: string, content?: string }) => void
    /**获取版本名 */
    YpJsToGetVersion: () => Promise<{
        version: string
    }>
    /**获取设备ID */
    YpJsToGetDeviceID: () => Promise<{
        deviceID: string
    }>
    /**获取渠道ID */
    YpJsToGetChannelID: () => Promise<{
        channelID: string
    }>
    /**设置剪贴板 */
    YpJsToSetClipboard: (jsonData: { content: string }) => Promise<{
        /**0失败 1成功 */
        isSuccess: number
        /**失败/成功原因 */
        msg: string
    }>
    /**绑定第三方账号 */
    YpJsToBindAccount: () => Promise<{
        /**0失败 1成功 */
        isSuccess: number
    }>
    /**绑定手机账号 */
    YpJsToBindMobile: () => Promise<{
        /**0失败 1成功 */
        isSuccess: number
    }>
    /**上传图片 */
    YpJsToUploadPhoto: () => Promise<{
        /**图片base64 */
        msg: string
    }>
    /**
     * 唤起关闭摇一摇功能
     * @param jsonData operate是否开启 1开启 0关闭
     * @param shakeCb 开启时每次摇一摇都会调用
     */
    YpJsToShake: (jsonData: { operate: number }, shakeCb: ({ isShake: number }) => void) => void
    /**
     * 赛事预约成功
     * id 预约成功的赛事id
     */
    YpJsToSetAppointmentSuccess: (jsonData: { id: number }) => void
    /**
     * 分享图片
     * url base64
     */
    YpJsToSharePicture: (jsonData: { url: string }) => void
    /**
     * 保存图片
     */
    YpJsToSavePicture: (jsonData: { url: string, name: string }) => void
    /**获取粘贴板数据 */
    YpJsToGetPaste: () => Promise<{
        msg: string
    }>
    /**设置标题 */
    YpJsToSetTitle: (jsonData: { title: string }) => void
    /**设置导航栏样式 */
    YpJsToSetNavBarStyle: (jsonData: { titleColor: string, backgroundColor: string }) => void
    /**隐藏导航栏 */
    YpJsToHideNavBar: () => void
    /**
     * 举报
     * type 举报类型 1直播 2用户 3私信 4视频 5视频评论 6动态评论 7竞猜举报
     * uid 举报的相关uid
     * content 举报内容
     * customId 举报对应的id 视频id、评论id、竞猜id
     */
    YpJsToReport: (jsonData: { type: number, uid: string, content?: string, customId?: number }) => void
    /**
     * 启动弹窗
     * type 弹窗样式 0默认 1自定义背景样式
     * content 弹窗文案 type0必填
     * mainButton 主按钮文案 type0必填
     * subButton 副按钮文案 type0必填
     * backgroundUrl 弹窗背景图  type1必填
     * buttonUrl 按钮图 type1必填
     */
    YpJsToDialog: (jsonData: { type: number, content?: string, mainButton?: string, subButton?: string, backgroundUrl?: string, buttonUrl?: string }) => void
    /**
     * 判断是否安装某应用
     */
    YpJsToCheckAPP: (jsonData: { packageName: string }) => Promise<{
        packageName: string
        /**0未安装 1已安装 */
        isInstalled: number
    }>
    /**签到成功 */
    YpJsToSetSignInSuccess: () => void
    /**打开直播间用户信息弹窗 */
    YpJsToUserDialog: (jsonData: { id: string, userNick: string }) => void
    /**获取设备相关信息 */
    YpJsToGetAppInfo: () => Promise<{
        version: string
        deviceID: string
        channelID: string
        udid: string
    }>
    /**
     * 调起AppStore评分页面
     * isAppInternalTuning 是否应用内部调起 0跳转appstore 1应用内调起
     * isOverrunTuning 应用内调起次数超限是否跳转appstore 0不跳转 1跳转
     */
    YpJsToAppStoreComment: (jsonData: { isAppInternalTuning: number, isOverrunTuning: number }) => void
    /**获取登录信息 */
    YpJsToSetLoginInfo: () => Promise<{
        token: string
        authCode: string
        uid: string
        avatar: string
        level: string
    }>
    YpJsToLogin: () => Promise<{
        token: string
        authCode: string
        uid: string
        avatar: string
        level: string
    }>
}