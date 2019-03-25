<template>
  <section class="line-con">
    <div class="cover"
      v-show='isHalt'> </div>
    <slot name='cell'
      rel='cellTemplate'></slot>
    <div class="line-table"
      ref='lineTable'>

    </div>
    <canvas class="line-panel"
      id='lineCanvas'></canvas>
  </section>
</template>

<script>
export default {
  name: "lintIt",
  props: [
    "color", //线条颜色
    "shadowColor", //线条阴影颜色
    "successColor", //线条成功阴影颜色
    "successShadowColor", //线条成功阴影颜色
    "errorColor", //线条错误颜色
    "errorShadowColor", //线条错误阴影颜色
    "question", //当前的题目
    "target",
    "blur" //模糊程度
  ],
  computed: {
    curQues() {
      let arr = [];
      for (let i = 0; i < this.question.map.row; i++) {
        let subArr = [];
        for (let j = 0; j < this.question.map.col; j++) {
          subArr.push("");
        }
        arr.push(subArr);
      }
      return arr;
    },
    targetSelector() {
      return "." + this.target;
    }
  },
  data() {
    return {
      chosenMap: [], //处于连线中的点
      guideMap: [], //用于演示的临时数组
      canvas: null,
      context: null,
      currentPoint: { x: 0, y: 0 }, //记录当前连到的点坐标
      currentQuestion: "", //当前随机到的题目
      result: false,
      isHalt: false,
      cloneObj: null
    };
  },
  mounted() {
    this.initRequestAnimationFrame();
    this.doRender();
    this.initialPen();
  },
  watch: {
    question(newval, oldval) {
      this.initialPen();
      this.doRender();
    }
  },
  methods: {
    initRequestAnimationFrame() {
      (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
              callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };
        }
        if (!window.cancelAnimationFrame) {
          window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
          };
        }
      }());
    },
    async play() {
      this.halt();
      let question = this.question;
      let { answer } = question;
      this.currentQuestion = this.fixIndex(answer);
      for (let i = 0; i < this.currentQuestion.length; i++) {
        this.guideMap.push(this.currentQuestion[i]);
        await this.drawGuidePoints();
      }
      this.chosenMap = [...this.guideMap];
      this.drawPoints();
      await this.sleep(500);
      this.reset();
      this.continue();
      this.$emit("guideFinish");
    },
    halt() {
      this.isHalt = true;
    },
    continue() {
      this.isHalt = false;
    },
    doRender(createElement) {
      let copy = this.$slots.cell[0].elm || this.cloneObj;
      this.cloneObj = copy;
      let slot = copy.cloneNode(true);
      this.$slots.cell[0].elm &&
        this.$slots.cell[0].elm.parentNode.removeChild(this.$slots.cell[0].elm);
      let container = document.createDocumentFragment();
      let attributes = this.$refs.lineTable.attributes;
      let hash = "";
      let searchTarget = node => {
        if (node.classList.contains(this.target)) return node;
        const searchChildren = node => {
          let children = node.childNodes;
          for (let i in children) {
            let child = children[i];
            if (typeof child != "object") continue;

            if (child && child.classList.contains(this.target)) {
              return child;
            } else {
              searchChildren(child);
            }
          }
        };
        return searchChildren(node);
      };
      for (let i in attributes) {
        let el = attributes[i].name;
        if (el.indexOf("data-v-") > -1) {
          hash = el.split("=")[0];
          break;
        }
      }
      let curQuestion = this.curQues;
      for (let i in curQuestion) {
        let row = curQuestion[i];
        let rowIndex = i;
        let curRow = document.createElement("div");
        curRow.classList.add("line-row");
        curRow.setAttribute(hash, "");
        for (let j in row) {
          let colIndex = j;
          let col = row[j];
          let curCell = document.createElement("div");
          curCell.classList.add("line-cell");
          curCell.setAttribute(hash, "");
          let node = slot.cloneNode(true);
          node.classList.add("styler");
          let templateNode = searchTarget(node);
          templateNode.setAttribute("data-row", rowIndex);
          templateNode.setAttribute("data-col", colIndex);
          templateNode.addEventListener("touchstart", e => {
            let index = parseInt(rowIndex * row.length) + parseInt(colIndex);
            this.touchstart(e, col, index);
          });
          templateNode.addEventListener("touchmove", e => {
            let index = parseInt(rowIndex * row.length) + parseInt(colIndex);
            this.touchmove(e, col, index);
          });
          templateNode.addEventListener("touchend", e => {
            let index = parseInt(rowIndex * row.length) + parseInt(colIndex);
            this.touchend(e, col, index);
          });
          curCell.appendChild(node);
          curRow.appendChild(curCell);
        }
        container.appendChild(curRow);
      }
      this.empty(this.$refs.lineTable);
      this.$refs.lineTable.appendChild(container);
    },
    empty(ele) {
      while (ele.hasChildNodes()) {
        ele.removeChild(ele.firstChild);
      }
    },
    initialPen() {
      let container = document.querySelector(".line-con");
      let canvas = document.querySelector("#lineCanvas");
      let attributes = canvas.attributes;
      let hash;
      for (let i in attributes) {
        let el = attributes[i].name;
        if (el.indexOf("data-v-") > -1) {
          hash = el.split("=")[0];
          break;
        }
      }
      container.removeChild(canvas);
      let doc = document.createElement("canvas");
      doc.classList.add("line-panel");
      doc.setAttribute("id", "lineCanvas");
      doc.setAttribute(hash, "");
      container.appendChild(doc);
      setTimeout(() => {
        this.canvas = null;
        this.context = null;
        this.canvas = document.querySelector("#lineCanvas");
        let rawWidth = parseFloat(
          window.getComputedStyle(this.canvas, false).width
        );
        let rawHeight = parseFloat(
          window.getComputedStyle(this.canvas, false).height
        );
        this.canvas.width = rawWidth;
        this.canvas.height = rawHeight;
        this.context = this.canvas.getContext("2d");
        this.context.lineWidth = 2;
        this.context.shadowBlur = this.blur || 60;
        this.context.lineCap = "round";
        this.context.strokeStyle = this.color;
        this.context.shadowColor = this.shadowColor;
      }, 200);
    },
    px(size) {
      let canvasTop = this.canvas.getBoundingClientRect().top;
      return size - canvasTop;
    },
    pl(size) {
      let canvasLeft = this.canvas.getBoundingClientRect().left;
      return size - canvasLeft;
    },
    getStyler() {
      return document.querySelectorAll(".styler");
    },
    fixIndex(str) {
      return str
        .split("")
        .map(el => (el == "a" ? 10 : el == "b" ? 11 : el == "c" ? 12 : el))
        .map(el => parseInt(el) - 1);
    },
    drawPoints() {
      let chosenMap = this.chosenMap;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let elements = document.querySelectorAll(this.targetSelector);
      chosenMap.map((el, index) => {
        let element = elements[el];
        this.active(el);
        let centerPoint = this.getElCenter(element);
        if (index == 0) {
          this.context.beginPath();
          this.context.moveTo(
            this.pl(centerPoint.clientX),
            this.px(centerPoint.clientY)
          );
        }
        this.context.lineTo(
          this.pl(centerPoint.clientX),
          this.px(centerPoint.clientY)
        );
        if (index == chosenMap.length - 1) {
          this.context.stroke();
          this.context.closePath();
          this.currentPoint = {
            x: centerPoint.clientX,
            y: centerPoint.clientY
          };
        }
      });
    },
    drawTest() {
      let nextPoint = "10";

      let initTime;
      let preTime;
      let duration = 500;

      let elements = document.querySelectorAll(this.targetSelector);
      let lastPoint = "0";
      let lastEl = elements[lastPoint];
      let nextEl = elements[nextPoint];
      const draw = () => {
        return new Promise(resolve => {
          let loop = time => {
            if (!preTime) {
              initTime = time;
              preTime = time;
            }
            let totalTime = time - initTime;
            let timeOffset = time - preTime;
            let lastCenter = this.getElCenter(lastEl);
            let nextCenter = this.getElCenter(nextEl);

            let xOffset = nextCenter.clientX - lastCenter.clientX;
            let yOffset = nextCenter.clientY - lastCenter.clientY;
            let xStep = xOffset / duration;
            let yStep = yOffset / duration;
            let curPos = {
              x: lastCenter.clientX + xStep * totalTime,
              y: lastCenter.clientY + yStep * totalTime
            };
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawPoints();
            this.context.beginPath();
            this.context.moveTo(
              this.pl(lastCenter.clientX),
              this.px(lastCenter.clientY)
            );
            this.context.lineTo(this.pl(curPos.x), this.px(curPos.y));
            this.context.stroke();
            this.context.closePath();
            if (totalTime <= duration) {
              window.requestAnimationFrame(loop);
            } else {
              resolve();
            }
          };
          window.requestAnimationFrame(loop);
        });
      };
      draw();
    },
    drawFollow({ clientX, clientY }) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawPoints();
      this.context.beginPath();
      this.context.moveTo(
        this.pl(this.currentPoint.x),
        this.px(this.currentPoint.y)
      );
      this.context.lineTo(this.pl(clientX), this.px(clientY));
      this.context.stroke();
      this.context.closePath();
    },
    drawGuidePoints() {
      return new Promise(async res => {
        let guideMap = this.guideMap;
        this.chosenMap = [...guideMap];
        let nextPoint = this.chosenMap.pop();

        let initTime;
        let preTime;
        let duration = 500;

        let elements = document.querySelectorAll(this.targetSelector);
        let lastPoint = this.chosenMap[this.chosenMap.length - 1];
        let lastEl = elements[lastPoint];
        let nextEl = elements[nextPoint];
        const draw = () => {
          return new Promise(resolve => {
            let loop = time => {
              if (!preTime) {
                initTime = time;
                preTime = time;
              }
              let totalTime = time - initTime;
              let timeOffset = time - preTime;
              let lastCenter = this.getElCenter(lastEl);
              let nextCenter = this.getElCenter(nextEl);
              let xOffset = nextCenter.clientX - lastCenter.clientX;
              let yOffset = nextCenter.clientY - lastCenter.clientY;
              let xStep = xOffset / duration;
              let yStep = yOffset / duration;
              let curPos = {
                x: lastCenter.clientX + xStep * totalTime,
                y: lastCenter.clientY + yStep * totalTime
              };
              this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
              );
              this.drawPoints();
              this.context.beginPath();
              this.context.moveTo(
                this.pl(lastCenter.clientX),
                this.px(lastCenter.clientY)
              );
              this.context.lineTo(this.pl(curPos.x), this.px(curPos.y));
              this.context.stroke();
              this.context.closePath();
              if (totalTime <= duration) {
                window.requestAnimationFrame(loop);
              } else {
                resolve();
              }
            };
            window.requestAnimationFrame(loop);
          });
        };
        if (lastEl) {
          await draw();
        }

        res();
      });
    },
    getElCenter(el) {
      let widthHalf = parseFloat(window.getComputedStyle(el, false).width) / 2;
      let heightHalf =
        parseFloat(window.getComputedStyle(el, false).height) / 2;
      let left = el.getBoundingClientRect().left;
      let top = el.getBoundingClientRect().top;
      return {
        clientX: left + widthHalf,
        clientY: top + heightHalf
      };
    },
    touchstart(e, cell, index) {
      e.preventDefault();
      this.chosenMap.push(`${index}`);

      let { clientX, clientY } = this.getElCenter(e.target);
      clientY = this.px(clientY);
      this.currentPoint = {
        x: clientX,
        y: clientY
      };
      this.context.moveTo(clientX, clientY);
    },
    touchmove(e, cell, index) {
      let { clientX, clientY } = e.changedTouches[0];
      this.drawFollow({ clientX, clientY });
      let width = parseFloat(window.getComputedStyle(e.target, null).width);
      let height = parseFloat(window.getComputedStyle(e.target, null).height);
      let creashIdx = this.crash({ clientX, clientY, width, height }, index);
    },
    touchend(e, cell) {
      let isWrong = false;
      let len = 0;
      this.chosenMap.map((el, index) => {
        len ++ ;
        if (el != this.currentQuestion[index]) {
          isWrong = true;
        }
      });
      let { answer } = this.question;

      isWrong = isWrong || answer.length != len;

      this.drawPoints();
      this.result = !isWrong;
      this.$emit("getResult", {
        result: this.result,
        chosen: this.chosenMap
      });
    },
    getCurOffsets() {
      let arr = document.querySelectorAll(this.targetSelector);

      let offset = [];
      for (let i in arr) {
        let el = arr[i];
        if (typeof el !== "object") continue;
        let x = el.getBoundingClientRect().left;
        let y = el.getBoundingClientRect().top;
        offset.push({
          x,
          y
        });
      }
      return offset;
    },
    getOffsetLeft(el) {
      return el.offsetLeft;
    },
    getOffsetTop(el) {
      let top = 0;
      let node = el;
      while (node.parentNode) {
        top += node.offsetTop;
        node = node.parentNode;
      }
      return top;
    },
    isIn(index) {
      for (let i in this.chosenMap) {
        if (this.chosenMap[i] == index) {
          return true;
        }
      }
      return false;
    },
    toggleActive(index) {
      let list = this.getStyler();
      let cur = list[index];
      if (cur.classList.contains("active")) {
        cur.classList.remove("active");
      } else {
        cur.classList.add("active");
      }
    },
    active(index) {
      let el = this.getStyler()[index];
      el.classList.add("active");
    },
    disabled(index) {
      let el = this.getStyler()[index];
      el.classList.remove("active");
    },
    crash({ clientX, clientY, width, height }) {
      //鼠标碰撞检测
      let offsets = this.getCurOffsets();
      for (let i in offsets) {
        if (this.isIn(i)) {
          continue;
        }
        let { x, y } = offsets[i];
        let leftEdge = x;
        let rightEdge = x + width;
        let topEdge = y;
        let bottomEdge = y + height;
        if (
          clientX > leftEdge &&
          clientX < rightEdge &&
          clientY > topEdge &&
          clientY < bottomEdge
        ) {
          let el = document.querySelectorAll(this.targetSelector)[i];
          let row = parseInt(el.getAttribute("data-row"));
          let col = parseInt(el.getAttribute("data-col"));
          let index = row * this.question.length + col;
          this.chosenMap.push(i);
        }
      }
    },
    reset() {
      let arr = document.querySelectorAll(this.targetSelector);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i in arr) {
        let el = arr[i];
        if (typeof el !== "object") continue;
        this.disabled(i);
      }
      this.chosenMap = [];
      this.guideMap = [];
      this.result = false;
    },
    sleep(time) {
      return new Promise(res => {
        setTimeout(function() {
          res();
        }, time);
      });
    },
    error() {
      this.errorColor && (this.context.strokeStyle = this.errorColor);
      this.errorShadowColor &&
        (this.context.shadowColor = this.errorShadowColor);
      let stylers = this.getStyler();
      this.drawPoints();
      for (let i in stylers) {
        let cur = stylers[i];
        if (typeof cur != "object") continue;

        cur.classList.add("error");
        cur.classList.remove("active");
      }
    },
    success() {
      this.successColor && (this.context.strokeStyle = this.successColor);
      this.successShadowColor &&
        (this.context.shadowColor = this.successShadowColor);
      let stylers = this.getStyler();
      this.drawPoints();
      for (let i in stylers) {
        let cur = stylers[i];
        if (typeof cur != "object") continue;
        cur.classList.add("success");
        cur.classList.remove("active");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .line-con {
    position: relative;
    .cover {
      width: 100%;
      height: 100%;
      z-index: 50;
      position: absolute;
      left: 0;
      top: 0;
    }
    .line-panel {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 5;
    }
    .line-table {
      width: 100%;
      display: table;
      position: relative;
      z-index: 10;
    }
    .line-row {
      display: table-row;
    }
    .line-cell {
      display: table-cell;
    }
  }
</style>


