/**
 * 回到顶部的实现逻辑
 */
export default class moveTo {
    constructor({ target, parent, duration = 700, easing = this.easeOutQuart, callback = () => { } }) {
        if (!target) {
            return new Error('缺少参数target')
        }

        this.parent = parent;
        this.target = target;
        this.duration = duration;
        this.easing = easing;
        this.callback = callback;


        this.currentPos = '';
        this.initialScrollTop = '';

        this.init();
    }
    requestAnimationFrame(loop) {
        return window.requestAnimationFrame(loop) ||
            window.webkitRequestAnimationFrame(loop) ||
            window.mozRequestAnimationFrame(loop) ||
            window.setTimeout(loop, 6000 / 60);
    }
    init() {
        const bindFn = (e) => {
            //to save the initial offset.


            let startTime = null;

            //animation loop
            const loop = (currentTime) => {
                if (this.parent) {
                    this.initialScrollTop = document.querySelector(this.parent).scrollTop;
                } else {
                    this.initialScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                }
                let body = document.body;
                let html = document.documentElement;
                this.currentPos = this.initialScrollTop;
                if (!startTime) {
                    startTime = currentTime - 1;
                }
                //to calculate current timeElapsed
                const timeElapsed = currentTime - startTime;

                //to calculate currentPosition using easingFunc.
                const val = this.easing(
                    timeElapsed, 0, this.initialScrollTop, this.duration
                );
                //to stop when the scrolltop and exec callback
                if (timeElapsed < this.duration) {
                    this.currentPos = this.initialScrollTop - val;
                    if (this.parent) {
                        document.querySelector(this.parent).scrollTop = this.currentPos
                    } else {
                        body.scrollTop = this.currentPos;
                        html.scrollTop = this.currentPos;
                    }

                    this.requestAnimationFrame(loop);
                } else {
                    this.callback();
                }
            }
            const frame = this.requestAnimationFrame(loop);
        }
        this.target.addEventListener('click', bindFn);
    }
    //default easing function
    easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }
}