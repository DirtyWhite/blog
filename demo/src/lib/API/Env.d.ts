export interface env {
    href: string
    testReg: RegExp
    otReg: RegExp
    ua: string
    isAndroid: boolean
    isIos: boolean
    isMobile: boolean
    isPc: boolean
    isGameBox: boolean
    isYouPai: boolean
    isIosGameBox: boolean
    isAndroidGameBox: boolean
    isIosYoupai: boolean
    isAndroidYoupai: boolean
    isWexin: boolean
    isTest: boolean
    isOt: boolean
    isOnline: boolean
    isOuterShare: boolean
    isLocal: boolean
}
declare var Env: env
export default Env