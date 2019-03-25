class HostConfig {
    constructor(ctx) {
        if (process.env.VUE_ENV !== 'server') {
            this.href = ctx ? ctx.href : window.location.href;
            this.regTest = /\/test\/|\/t2\/|\/test\./i;
            this.regOt = /\/ot\/|\/ot\./i;
            this.env = '';
            this.serverHost = '';
            this.nodeHost = ''
            this.host = '';
            this.tjHost = ''
            this.init();
        }
    }
    init() {
        this.host = this.getHost()
        this.tjHost = this.getTjhost()
        this.nodeHost = this.getRoot();
    }
    getRoot() {
        if (this.href.indexOf('localhost') > -1 || this.href.indexOf('192.168') > -1) {
            return '//localhost:4040/'
        } else if (this.regTest.test(this.href)) {
            return '//dlstest.img4399.com/redirect/huodong.4399.cn/test/game/'
        } else if (this.regOt.test(this.href)) {
            return '//dlstest.img4399.com/redirect/huodong.4399.cn/ot/game/'
        } else {
            return '//huodong.4399.cn/game/'
        }
    }
    getHost() {
        if (this.href.indexOf('localhost') > -1 || this.href.indexOf('192.168') > -1) {
            return '//dlstest.img4399.com/redirect/huodong.4399.cn/test/game/api'
        }else if (this.regTest.test(this.href)) {
            this.env = 'test'
            this.serverHost = '//dlstest.img4399.com/redirect/huodong.4399.cn/test/game/y2018/game/gameLottery'
            return '//dlstest.img4399.com/redirect/huodong.4399.cn/test/game/api'
        } else if (this.regOt.test(this.href)) {
            this.env = 'online'
            this.serverHost = '//dlstest.img4399.com/redirect/huodong.4399.cn/ot/game/y2018/game/gameLottery'
            return '//dlstest.img4399.com/redirect/huodong.4399.cn/ot/game/api'
        } else {
            this.env = 'online'
            this.serverHost = '//huodong.4399.cn/game/y2018/game/gameLottery'
            return '//huodong.4399.cn/game/api'
        }
    }
    getTjhost() {
        if (this.regTest.test(this.href) || (this.href.indexOf('localhost') > -1) || (this.href.indexOf('192.168') > -1)) {
            return 'http://mobi.4399tech.com/redirect/tj.img4399.com/test'
        } else {
            return 'http://tj.img4399.com:8010';
        }
    }
}
export default new HostConfig()
