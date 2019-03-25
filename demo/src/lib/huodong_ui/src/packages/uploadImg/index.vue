<template>
  <section class="wrap-upload"
    ref="image">
    <slot name="background" />
    <input type="file"
      @click="inputClick"
      ref="input"
      @change="uploadPhoto">
    <div @click="deleteImg">
      <slot name="delete" />
    </div>
    <div class="innerImg"
      v-show="uploadIMG.base64"
      :style="`background-image:url(${uploadIMG.base64});background-size:${backgroundSize}`"></div>
  </section>
</template>

<script>
const { EXIF } = require("./exif");
export default {
  props: {
    limitSize: {
      required: false,
      type: Number
    },
    backgroundSize: {
      required: false,
      type: String,
      default: "cover"
    },
    isDetectRotation: {
      required: false,
      type: Boolean,
      default: true
    },
    scaleRadio: {
      required: false,
      type: Number,
      default: 3
    },
    // 允许点击已上传图片再次上传
    isRepeat: {
      type: Boolean,
      default: true,
      required: false
    },
    img: {
      type: String
    }
  },
  data() {
    return {
      uploadIMG: { file: null, base64: "" }
    };
  },
  watch: {
    img(val) {
      if (val) {
        this.uploadIMG.base64 = val;
      } else {
        this.deleteImg();
      }
    }
  },
  methods: {
    click() {
      this.$refs.input.click();
    },
    deleteImg() {
      if (this.img) return;
      this.uploadIMG = { file: null, base64: "" };
      this.$refs.input.value = "";
    },
    inputClick(e) {
      let img = this.$refs.image;
      this.$refs.input.value = "";
      if (!this.isRepeat && this.uploadIMG.base64) {
        e.preventDefault();
        return;
      }
    },
    uploadPhoto(e) {
      //上传图片
      this.$emit("uploadBegin");
      let img = this.$refs.image;
      let reader = new FileReader();
      let input = e.target;
      if (
        this.limitSize &&
        input.files[0] &&
        input.files[0].size > this.limitSize
      ) {
        this.$emit("overSize");
        return;
      } else {
        input.files[0] && reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0].size, "压缩前");

      this.uploadIMG.file = input.files[0];
      reader.onload = async e => {
        let base64 = e.target.result; //获得base64地址
        if (this.isDetectRotation) {
          base64 = await this.detectRotateImg(base64, 1);
        } else if (this.scaleRadio > 1) {
          base64 = await this.detectRotateImg(base64, 0);
        }
        this.uploadIMG.base64 = base64;
        this.$emit("uploadDone", this.uploadIMG);
      };
    },
    /* 检测是否需要旋转图片 */
    async detectRotateImg(base64, isRotation) {
      let tmpImg = new Image();
      tmpImg.src = base64;
      await new Promise(res => {
        tmpImg.onload = res;
      });
      tmpImg.width = tmpImg.width / this.scaleRadio;
      tmpImg.height = tmpImg.height / this.scaleRadio;
      if (!isRotation) {
        return this.drawCanvas(tmpImg, 0);
      }
      let Orientation = await new Promise(res => {
        try {
          EXIF.getData(tmpImg, function() {
            let tags = EXIF.getAllTags(this);
            let { Orientation } = tags;
            res(Orientation);
          });
        } catch (e) {
          res(0);
        }
      });
      /* 被旋转了 */
      if (Orientation == 6) {
        return this.drawCanvas(tmpImg, 1);
      } else {
        if (this.scaleRadio > 1) {
          return this.drawCanvas(tmpImg, 0);
        } else {
          return base64;
        }
      }
    },
    drawCanvas(tmpImg, isRotation) {
      let doc = document.createDocumentFragment("div");
      let canvas = document.createElement("canvas");
      doc.appendChild(canvas);
      let ctx = canvas.getContext("2d");
      if (isRotation) {
        canvas.height = tmpImg.width;
        canvas.width = tmpImg.height;
      } else {
        canvas.height = tmpImg.height;
        canvas.width = tmpImg.width;
      }
      canvas.style.border = "2px solid black";
      let xpos = canvas.width / 2;
      let ypos = canvas.height / 2;
      ctx.save(); //保存状态
      ctx.translate(xpos, ypos); //设置旋转中心
      ctx.rotate((isRotation ? 90 : 0) * Math.PI / 180); //旋转
      ctx.drawImage(
        //画图，画在中心
        tmpImg,
        -tmpImg.width / 2,
        -tmpImg.height / 2,
        tmpImg.width,
        tmpImg.height
      );
      ctx.restore();
      let base64 = "";
      base64 = canvas.toDataURL("image/png");
      doc.removeChild(canvas);
      console.log(base64.length, "压缩后");
      return base64;
    }
  }
};
</script>

<style lang="scss" scoped>
  .wrap-upload {
    position: relative;
    display: inline-block;
    overflow: hidden;
    .innerImg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-position: center;
      background-repeat: no-repeat;
      pointer-events: none;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
</style>



