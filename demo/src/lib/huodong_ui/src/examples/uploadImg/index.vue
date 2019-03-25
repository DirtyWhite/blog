<template>
  <Example :info="exampleInfo.info"
    :code="exampleInfo.code"
    :tableInfo="exampleInfo.tableInfo">
    <UploadImg :limitSize="1*1024*1024*1024*1024"
      class="wrap-upload"
      ref="upload"
      v-for="(item,index) in imglist"
      :img="item.base64"
      :key="index"
      :scaleRadio="1"
      @overSize="overSize"
      @uploadBegin="uploadBegin"
      @uploadDone="uploadDone($event,index)">
      <div slot="background"
        class="uploadBg"></div>
      <div class="loadimg-delete"
        slot="delete"
        @click="deleteImg(index)"
        v-if="item.base64"></div>
    </UploadImg>
  </Example>
</template>

<script>
import Example from "../../components/example/index";
import UploadImg from "../../packages/uploadImg/index";
export default {
  components: { UploadImg, Example },
  data() {
    return {
      exampleInfo: {
        info: {
          title: "上传图片",
          author: "gaofanni",
          tip:
            "上传图片显示上传结果的组件，支持传入地址初始化图片显示，支持删除图片位置往前补全"
        },
        code: `
        <UploadImg :limitSize="1*1024*1024*1024*1024"
          class="wrap-upload"
          ref="upload"
          v-for="(item,index) in imglist"
          :img="item.base64"
          :key="index"
          @overSize="overSize"
          @uploadBegin="uploadBegin"
          @uploadDone="uploadDone($event,index)">
          <div slot="background"
            class="uploadBg"></div>
          <div class="loadimg-delete"
            slot="delete"
            @click="deleteImg(index)"
            v-if="item.base64"></div>
        </UploadImg>

        <script>
          export default {
            data(){
              return{
                imglist: [
                  {
                    file: {},
                    base64: ""
                  },
                  {
                    file: {},
                    base64: ""
                  },
                  {
                    file: {},
                    base64: ""
                  }
                ],
                imgNum: 0
              }
            },
            methods:{
              uploadDone({ file, base64 }, index) {
                this.imglist[index].file = file;
                this.imglist[index].base64 = base64;
                base64 && this.imgNum++;
                console.log("上传结束");
              },
              deleteImg(index) {
                this.imglist[index].file = {};
                this.imglist[index].base64 = "";
                this.initImgList()
              },
              initImgList() {
                // 重置imgList，用于删除前置图片，后置图片往前补齐需要
                let newImg = [];
                let newIndex = 0;
                for (let n in this.imglist) {
                  if (this.imglist[n].base64) {
                    newImg.push(this.imglist[n]);
                    newIndex++;
                  }
                }
                while (newIndex < this.imglist.length) {
                  newImg.push({
                    file: {},
                    base64: ""
                  });
                  newIndex++;
                }
                for (let n in newImg) {
                  this.$set(this.imglist[n], "file", newImg[n].file);
                  this.$set(this.imglist[n], "base64", newImg[n].base64);
                }
              },
              overSize() {
                alert("超过限制大小啦");
              },
              uploadBegin() {
                console.log("开始上传");
              }
            }
          }
        <\/script>
        `,
        tableInfo: {
          attributes: [
            {
              propName: "limitSize",
              explain:
                "上传大小尺寸限制，如需限制大小可传入，单位为k（如1m需填入1*1024*1024）",
              type: "Number",
              default: "-",
              required: "false"
            },
            {
              propName: "backgroundSize",
              explain: "上传后显示出来的image背景尺寸",
              type: "String",
              default: "cover",
              required: "false"
            },
            {
              propName: "isDetectRotation",
              explain:
                "是否需要检测旋转（用于ios拍照后图片会发生旋转，需旋转回正确方向则调用），默认检测",
              type: "Boolean",
              default: "true",
              required: "false"
            },
            {
              propName: "scaleRadio",
              explain:
                "与isDetectRotation配合使用，由于canvas手动旋转会使图片大小增加，过大容易导致程序崩溃，缩小质量，默认缩小三倍",
              type: "Number",
              default: "3",
              required: "false"
            },
            {
              propName: "img",
              explain:
                "若有传初始化图片显示，前置图片删除，需求要求后面图片往前补全时，操作外面数据联动组件内图片显示",
              type: "String",
              required: "false"
            },
            {
              propName: "isRepeat",
              explain:
                "点击已上传图片组件是否响应，传入false不响应，用于只可用删除按钮删除已传图片的需求时填入",
              type: "Boolean",
              default: "true",
              required: "false"
            }
          ],
          events: [
            {
              eventsName: "overSize",
              explain: "若props有传入limitSize，超过限制大小则会传出回调",
              arguments: "-"
            },
            {
              eventsName: "uploadDone",
              explain: "上传结束后派发回调，传出file对象与base64地址",
              arguments: "{file,base64}"
            },
            {
              eventsName: "uploadBegin",
              explain: "上传开始时派发，用于需要加loading的场景"
            }
          ],
          slot: [
            {
              slotName: "background",
              explain: "上传图片的按钮插槽"
            }
          ],
          methods: [
            {
              name: "click",
              explain: "使上传图片按钮获得焦点",
              param: "-"
            }
          ]
        }
      },
      imglist: [
        {
          file: {},
          base64: ""
        },
        {
          file: {},
          base64: ""
        },
        {
          file: {},
          base64: ""
        }
      ]
    };
  },
  methods: {
    uploadDone({ file, base64 }, index) {
      this.imglist[index].file = file;
      this.imglist[index].base64 = base64;
      console.log("上传结束");
    },
    deleteImg(index) {
      this.imglist[index].file = {};
      this.imglist[index].base64 = "";
      this.initImgList();
    },
    initImgList() {
      let newImg = [];
      let newIndex = 0;
      for (let n in this.imglist) {
        if (this.imglist[n].base64) {
          newImg.push(this.imglist[n]);
          newIndex++;
        }
      }
      while (newIndex < this.imglist.length) {
        newImg.push({
          file: {},
          base64: ""
        });
        newIndex++;
      }
      for (let n in newImg) {
        this.$set(this.imglist[n], "file", newImg[n].file);
        this.$set(this.imglist[n], "base64", newImg[n].base64);
      }
    },
    overSize() {
      alert("超过限制大小啦");
    },
    uploadBegin() {
      console.log("开始上传");
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .wrap-upload {
    margin: re(10);
  }
  .uploadBg {
    width: re(140);
    height: re(140);
    border-radius: re(10);
    background: url("./images/icon-upload.png") no-repeat center #fcc0c0;
    background-size: 40% 40%;
    position: relative;
  }
  .num {
    font-size: re(22);
    margin-top: re(10);
    color: #dd5a5d;
    display: block;
    margin: 0 auto;
  }
  .loadimg-delete {
    @include whr(30,30);
    background: url("./images/icon_delete.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: re(10);
    top: re(10);
  }
</style>




