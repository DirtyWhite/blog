import gb from '../gameBox'
export default new class gameBox {
    getLoginInfo = {
        title: '获取用户登录信息',
        exec: () => {
            let data = gb.getLoginInfo();
            alert(data)
        },
        explain: '',
    }
    getScookie = {
        title: '获取用户登录token',
        exec: () => {
            let data = gb.getScookie();
            alert(data)
        }
    }
    getUdid = {
        title: '获取用户udid',
        exec: () => {
            let data = gb.getUdid();
            alert(data)
        }
    }
    getDeviceId = {
        title: '获取用户udid',
        exec: () => {
            let data = gb.getDeviceId();
            alert(data)
        }
    }

    doCopy = {
        title: '复制到剪贴板',
        exec: () => {

            gb.doCopy({
                text: '测试复制的',
                toastText: '测试复制成功',
                outer: alert
            });
        }
    }
    doToast = {
        title: 'toast提示',
        exec: () => {
            gb.doToast({
                message: '测试toast',
                outer: alert
            })
        }
    }
    doPlayVideo = {
        title: '播放视频',
        exec: () => {
            gb.doPlayVideo('测试视频', 'http://www.baidu.com')
        }
    }
    doClose = {
        title: '关闭活动页',
        exec: () => {
            gb.doClose()
        }
    }
    downloadApp = {
        title: '下载app',
        exec: () => {
            gb.downloadApp({
                downloadUrl: '',
                packageName: '',
                appName: '',
                icoPath: '',
                fileMD5: ''
            })
        }
    }
    updateApp = {
        title: '下载app',
        exec: () => {
            gb.updateApp({})
        }
    }
    doPageCallbackOnce = {
        title: '监听页面返回回调',
        exec: async () => {
            await gb.doPageCallbackOnce();
            console.log('pageCallback')
        }
    }
    jumpRecharge = {
        title: '跳转充值SDK',
        exec: () => {
            gb.jumpRecharge();
        }
    }
    jumpLogin = {
        title: '跳转登录页',
        exec: () => {
            gb.jumpLogin()
        }
    }
    jumpWallet = {
        title: '跳转钱包',
        exec: () => {
            gb.jumpWallet()
        }
    }
    jumpNewGame = {
        title: '跳转新游页',
        exec: () => {
            gb.jumpNewGame()
        }
    }
    jumpGameDetail = {
        title: '跳转游戏详情页',
        exec: () => {
            gb.jumpGameDetail('36227',0)
        }
    }
    jumpProfile = {
        title: '跳转个人主页',
        exec: () => {
            gb.jumpProfile('1665445583')
        }
    }
    jumpEarnHebi = {
        title: '跳转试玩赚盒币页',
        exec: () => {
            gb.jumpEarnHebi()
        }
    }
    jumpActivity = {
        title: '跳转新活动',
        exec: () => {
            gb.jumpActivity('', '')
        }
    }
    jumpFeed = {
        title: '跳转反馈',
        exec: () => {
            gb.jumpFeed()
        }
    }
    jumpHebiRecord = {
        title: '跳转盒币使用记录',
        exec: () => {
            gb.jumpHebiRecord()
        }
    }
    jumpDailySign = {
        title: '跳转签到',
        exec: () => {
            gb.jumpDailySign()
        }
    }
    jumpZoneTopic = {
        title: '跳转动态话题',
        exec: () => {
            gb.jumpZoneTopic(132)
        }
    }
    jumpNewFunc = {
        title: '跳转新功能介绍',
        exec: () => {
            gb.jumpNewFunc()
        }
    }
    jumpSetContact = {
        title: '跳转设置收货地址页',
        exec: () => {
            gb.jumpSetContact()
        }
    }
    jumpShop = {
        title: '跳转商店',
        exec: () => {
            gb.jumpShop()
        }
    }
    jumpGoodsDetail = {
        title: '跳转物品详情',
        exec: () => {
            gb.jumpGoodsDetail(5)
        }
    }
    jumpAddFeed = {
        title: '跳转发动态页',
        exec: () => {
            gb.jumpAddFeed()
        }
    }
    jumpMyZone = {
        title: '跳转我的动态',
        exec: () => {
            gb.jumpMyZone()
        }
    }
    


}