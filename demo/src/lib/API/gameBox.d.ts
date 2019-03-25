
import { gbshare } from "./gameBoxShare/gameBoxShare";

export interface gameBox {
    /**调用api找不到方法时则会调用 */
    setUndefinedHandler: Function
    /**
     * 拓展API，用于在API未覆盖所使用的API时补充定义
     * 后续可以提交到仓库中完善
     * @param name api名称
     * @param param A：安卓调用，I：ios调用，E：外部环境调用
     */
    extend(name: string, param: { A?: Function, I?: Function, E?: Function })
    /**
     * 判断安卓、IOS和外部环境来调用不同函数
     * @param A 
     * @param I 
     * @param E 
     */
    call(A?: Function, I?: Function, E?: Function): void
    /**
     * 获取登录信息
     */
    getLoginInfo(): loginInfo
    /**
     * 获取登录token
     */
    getScookie(): string
    /**
     * 获取udid
     */
    getUdid(): string
    /**
     * 获取设备id
     */
    getDeviceId(): string
    /**
     * 获取已经安装的游戏的包名，以 ， 隔开
     */
    getInstalledGames(): string
    /**
     * 获取是否某游戏安装
     */
    getIsGameInstalled(packagesStr: string): string
    /**
     * 获取用户uid
     */
    getUid(): string
    /**
     * 下载app
     * @param packages 需要初始化状态的包名，以 ， 隔开的字符串
     */
    getAppStatus(packages: string): Promise<appState>
    /**
     * 获取版本号
     * @returns Object:{version :4位版本号  , versioncode: 4位小版本号（逐步递增,用于准确判定版本）}
     */
    getVersion(): { version: number, versioncode: number }
    /**
     * 监听应用下载状态
     */
    watchAppDownloadStatus(): updator

    /**
     * 检查登录，未登录跳转登录
     * @returns scookie 登录token
     */
    doCheckLogin(): void | string
    /**
     * 复制并toast
     * @param text 复制的文本
     * @param toastText 复制成功的toast文本
     * @param outer 外部环境执行的函数
     */
    doCopy(text: string, toastText: string, outer: (text: string) => string)
    /**
     * 
     * @param message 提示的文本
     * @param outer 外部执行的函数
     */
    doToast(message: string, outer?: (message: string) => string)
    /**
     * 播放视频
     */
    doPlayVideo(title: string, url: string): void
    /**
     * 关闭活动页
     */
    doClose(): void
    /**
     * 启动应用
     * @param pkgName 应用包名
     */
    doLaunchApp(pkgName: string): void
    /**
     * 下载app
     * @param param 下载应用所需的信息
     */

    /**
     * 保存图片
     * @param {base64} 没有前缀的base64字符串
     */
    doSavePic(base64: string): void

    /**
     * 用新的webview打开地址
     * @param url webvie的地址
     */
    doOpenWebview(url: string): void

    /**
     * 下载应用，一般用于更新游戏盒
     * @param param app包信息
     */
    downloadApp(param: { downloadUrl: string, packageName: string, appName: string, icoPath: string, fileMD5: string }): void
    /**
     * 更新app，detail为服务端返回包信息
     * @param detail 
     */
    updateApp(detail: gameBoxUpdateObject): void
    /**
     * 
     * @param key 本次跳转的标识
     * @param callback 本次跳转的回调
     */
    doPageCallbackOnce(key?: string, callback?: () => void): Promise<void>
    /**
     * 对离开页面的行为做标注，下一次进入后，会在document上触发一个 triggerPageLeaveCallback 事件
     * 提供的event事件的data属性上带有上次存入的对象
     * @param key 保存在storage中的key
     * @param data 保存在storage中的value
     */
    doLeaveCallbackLeave(obj): void
    /**
     * 跳转头套页
     * @param id 头套id
     */
    jumpHeadgear(id: string): void
    /**
     * 跳转充值SDK页
     * @param id 活动id
     */
    jumpRecharge(id): void
    /**
     * 跳转登录页
     */
    jumpLogin(): void
    /**
     * 跳转钱包
     */
    jumpWallet(): void
    /**
     * 跳转新游页
     */
    jumpToNewGame(): void
    /**
     * 跳转游戏（游拍、兔耳也支持）详情页
     * @param id 游戏包id
     * @param index 进入详情页后默认激活的tab，0、1、2
     */
    jumpToGameDetail(id: string, index?: number): void
    /**
     * 跳转个人中心页
     * @param id 用户的uid
     */
    jumpPersonalPage(id: string): void
    /**
     * 跳转到转盒币任务页
     */
    jumpEarnHebi(): void
    /**
     * 在活动中启动其他活动，会获得全新的webview，分享配置不会受影响
     * @param id 活动id
     * @param url 活动的地址
     */
    jumpActivity(id: string, url: string): void
    /**
     * 跳转到反馈
     */
    jumpFeed(): void
    /**
     * 跳转到盒币使用记录
     */
    jumpHebiRecord(): void
    /**
     * 跳转每日签到
     */
    jumpDailySign(): void
    /**
     * 跳转到动态话题
     * @param id 话题的id
     */
    jumpZoneTopic(id: string): void
    /**
     * 新功能介绍页
     */
    jumpNewFunc(): void
    /**
     * 跳转到设置收货地址信息页（客户端只允许用户修改一次收获地址）
     */
    jumpSetContact(): void
    /**
     * 跳转盒币商城
     */
    jumpShop(): void
    /**
     * 跳转盒币商城的某个tab  0~3
     */
    jumpShopTab(tabIndex: number): void
    /**
     * 跳转商品详情
     * @param id 商品id
     */
    jumpGoodsDetail(id: number): void
    /**
     * 跳转到发动态页
     * @param {text} 自定义的文案 # 分割关键字
     */
    jumpAddFeed(text): void
    /**
     * 跳转到我的动态
     */
    jumpMyZone(): void
    /**
     * 跳转到我页
     */
    jumpMy(): void
    /**
     * 跳转全部直播页
     */
    jumpLiveList(): void
    /**
     * 跳转直播间
     * @param roomId 直播间id
     */
    jumpRoom(roomId: string): void
    /**
     * 跳转帖子详情页
     * @param forumsId 帖子id（群组id）
     */
    jumpForumsDetails(forumsId: string): void
    /**
     * 跳转游戏圈/群组话题页
     * @param fid 群组id
     * @param id 帖子id
     */
    jumpForumsTopic(fid, id): void
    /**
     * 跳转到圈子详情页
     * @param quanId 圈子id
     * @param tab 激活的tab
     */
    jumpHubDetail(quanId: string, tab: string): void
    /**
     * 跳转游戏圈发帖页
     * @param title 标题
     * @param content 内容
     * @param gamehubId 游戏圈id
     * @param forumId 论坛id（群组id）
     * @param kindID 类别id
     */
    jumpGameHubAdd(title: string, content: string, gamehubId: string, forumId: string, kindID: string): void
    /**
     * 跳转礼包详情页
     * @param giftId 礼包id
     */
    jumpGiftDetail(giftId: string): void
    /**
     * 跳转找游戏-推荐-某标签
     * @param tagName 标签名 新游：newgame，无敌：crackgame，女生：girlgame，网游：netgame
     */
    jumpHomeTagDetail(tagName: string): void
    /**
     * 跳转活动列表
     * @param id 活动id
     * @param type 1为所有活动，2为我的活动
     */
    jumpActivityList(id: number, type: number): void
    /**
     * 跳转赚零花钱
     */
    jumpDianle(): void
    /**
     * 跳转游戏圈-圈子
     */
    jumpQuan(): void
    /**
     * 跳转预约专区
     */
    jumpBooking(): void
    /**跳转新游页 */
    jumpNewGame(): void
    /**跳转装扮页 */
    jumpShopDressUp(): void
    /**跳转小游戏集合页 */
    jumpMiniGame(): void
    /**
     * 判断是否达到目标版本号
     * @param requiredVersion 目标4位版本号，如3.8.1 为 3810
     */
    isRequiredVersion(requiredVersion): boolean
    /**
     * 判断是否达到小版本号
     * @param requiredVersionCode 目标小版本号
     */
    isRequiredVersioncode(requiredVersionCode): boolean
    share: gbshare
}
interface m_exec {
    A?: Function
    I?: Function,
    E?: Function
}
interface loginInfo {
    uid: string
    nick: string
    sface: string
    sex: number
}
interface appState {
    packageName: string
    status: number
    explain: string
    shownTitle: string
}
interface updator {
    active: boolean
    downloadState: Object
    get(packageName: string): string
}


interface gameBoxUpdateObject {
    downUrl: string,
    //是否是插件包升级
    is_plugin: number,
    titleBgUrl: string,
    packageName: string,
    versionName: string,
    versionCode: string,
    desc: string,
    md5: string,
    size_byte: number
}

declare var box: gameBox;
export default box