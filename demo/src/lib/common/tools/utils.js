export default new class utils {
    constructor() {

    }
    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    wait(time) {
        return new Promise(res => {
            setTimeout(function () {
                res();
            }, time)
        })
    }
    formatName(value) {
        let val = value;
        let len = 0;
        let result;
        for (let i = 0; i < val.length; i++) {
            let c = val.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            }
            else {
                len += 2;
            }
        }
        return len <= 12 ? val : val.slice(0, 10) + '...';
    }
    formatNumber(value) {
        let val = value;
        if (val >= 0 && val <= 9999) return val;
        if (val >= 10000 && val <= 999999) {
            return val = (val / 10000).toFixed(1) + '万+'
        }
        if (val >= 10000 && val <= 999999) {
            return val = (val / 10000).toFixed(1) + '万+'
        }
        if (val >= 1000000 && val <= 99999999) {
            return val = (val / 10000) + '万+'
        }
        if (val >= 100000000) {
            return val = (val / 100000000).toFixed(1) + '亿+'
        }
    }
    queue(context, task, delay) {
        return new Promise(end => {
            let cur = 0;
            let len = task.length;
            const exec = (index) => {
                task[index].call(context).then(resolve => {
                    setTimeout(e => {
                        ++cur;
                        if (cur < len) {
                            exec(cur);
                        } else {
                            end();
                        }
                    }, delay)
                })
            }
        })
    }
    getComputedStyle(ele) {
        let left = ele && ele.ownerDocument.defaultView.getComputedStyle(ele).webkitTransform; //matrix(1, 0, 0, 1, 101.698, 0)
        let regLeft = /matrix\(1, 0, 0, 1, (-?\d+\.?\d*), (-?\d+\.?\d*)\)/;
        let res = regLeft.exec(left);
        if (!res) return {
            x: 0,
            y: 0
        };
        return {
            x: parseFloat(res[1]),
            y: parseFloat(res[2])
        }
    }
    /** 格式化时间戳 */
    formatTime(timestamp) {
        let date;
        if (timestamp < 100000000000) {
            date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        } else {
            date = new Date(timestamp);
        }
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return { Y, M, D, h, m, s };
    }
    /** 自定义toast */
    myToast(txt) {
        let template = `
                <div style="position:fixed;left:50%;bottom:2rem;margin-left:-5rem;width:9.275rem;height:2rem;background:rgba(0,0,0,0.7);background-size:100% auto;color:white;border-radius:1rem;font-size:0.5rem;line-height:2rem;text-align:center;z-index:10">
                ${txt}
                </div>
            `;
        let oDiv = document.createElement('div');
        oDiv.innerHTML = template;
        document.body.appendChild(oDiv);
        setTimeout(() => {
            document.body.removeChild(oDiv);
        }, 2000);
    }
    /** 手机号校验 */
    testPhone(number) {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(number)
    }
    /** localStorage缓存
     * 支持cookie降级
     */
    store(namespace, data) {
        var namespace = namespace;
        if (localStorage) {
            if (arguments.length > 1) {
                let json;
                try {
                    json = JSON.stringify(data)
                } catch (e) {
                    throw (`传入参数:${data}不符合要求  ` + e)
                }
                return localStorage.setItem(namespace, json);
            }
            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store));
        } else {
            //没有localStorage使用cookie存储
            function getCookie(c_name) {
                if (document.cookie.length > 0) {
                    var c_start = document.cookie.indexOf(c_name + "=");
                    var c_end;
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ""
            }
            if (arguments.length > 1) {
                return document.cookie = namespace + '=' + data
            }
            return getCookie(namespace)
        }
    }
    $watch(o, p, oriValue, setCallback, getCallback) {
        let _value = oriValue;
        Object.defineProperty(o, p, {
            set: (newVal) => {
                _value = newVal
                setCallback && setCallback(newVal)
                return newVal
            },
            get: () => {
                getCallback && getCallback()
                return _value
            }
        })
    }
    drawBorderSp(Laya, width, height, borderRadius, color, text = "") {
        let bg = new Laya.Sprite()
        bg.graphics.drawPath(0, 0, [
            ["moveTo", borderRadius, 0],
            ["lineTo", width - borderRadius * 2, 0],
            ["arcTo", width - borderRadius, 0, width - borderRadius, borderRadius, borderRadius],
            ["lineTo", width - borderRadius, height - borderRadius],
            ["arcTo", width - borderRadius, height, width - borderRadius * 2, height, borderRadius],
            ["lineTo", borderRadius, height],
            ["arcTo", 0, height, 0, height - borderRadius, borderRadius],
            ["lineTo", 0, borderRadius],
            ["arcTo", 0, 0, borderRadius, 0, borderRadius],
            ["closePath"]
        ], { fillStyle: color })
        if (text) {
            let txt = new Laya.Text()
            txt.text = text
            txt.width = width
            txt.height = height
            txt.align = 'center'
            txt.valign = 'middle'
            bg.addChild(txt)
            return { bg, txt }
        }
        return { bg }
    }
    /**
     * 获取到目标节点间的距离
     * @param {Object} target
     * @param {Object} parent
     */
    getOffsetTop(target, parent) {
        let top = 0;
        while (target && target !== parent) {
            top += target.offsetTop;
            target = target.offsetParent;
        }
        return top;
    }
}