<template>
  <div @click.stop.prevent="viewLink">
    <slot :current="{iconText,iconClass}"></slot>
  </div>
</template>

<script>
import bus from "../tools/bus";
export default {
  name: "download",
  data() {
    return {
      isGamebox: false
    };
  },
  computed: {
    iconText() {
      if (!this.isGamebox) {
        /*分享页不需要显示状态*/
        return this.downloadData.size && this.editSize(this.downloadData.size);
      }
      let Str;
      switch (this.downloadData.status) {
        case 100 /*下载中*/:
          Str = "下载中";
          break;
        case 101 /*暂停状态-继续*/:
          Str = "继续";
          break;
        case 102 /*等待中*/:
          Str = "等待中";
          break;
        case 103: /*下载成功状态-安装*/
        case 200 /*未安装状态-安装*/:
          Str = "安装";
          break;
        case 202: /*更新状态*/
        case 201 /* 已安装状态 */:
          return "开始玩";
          break;
        case -100 /* 网络错误状态 */:
          Str = "重试";
          break;
        default:
          Str = this.downloadData.size && this.editSize(this.downloadData.size);
      }
      return Str;
    },
    iconClass() {
      if (!this.isGamebox) {
        return "no";
      }
      let Str = "";
      switch (this.downloadData.status) {
        case 100 /*下载中*/:
          Str = "download";
          break;
        case 101 /*暂停状态-继续*/:
          Str = "continue";
          break;
        case 102 /*等待中*/:
          Str = "waiting";
          break;
        case 103: /*下载成功状态-安装*/
        case 200 /*未安装状态-安装*/:
          Str = "install";
          break;
        case 202: /*更新状态*/
        case 201:
          return "play";
          break;
        case -100:
          Str = "networkerror";
          break;
        default:
          Str = "no";
      }
      return Str;
    },
    appInfo() {
      let data = this.downloadData;
      var appInfoObj = {
        downloadUrl: data.downurl,
        packageName: data.packag,
        appName: data.appname,
        iconPath: data.icopath,
        fileMD5: data.md5_file
      };
      return appInfoObj;
    }
  },
  mounted() {
    this.isGamebox = /GameCenter/gi.test(navigator.userAgent);
    this.initCallback();
    this.initStatus();
    this.watchBindEventStatus();
  },
  methods: {
    watchBindEventStatus() {
      bus.$on(`bindevent_${this.downloadData.packag}`, statusArr => {
        this.downloadData.status = statusArr.status;
      });
    },
    initCallback() {
      window["updateApps" + this.downloadData.appname] = statusArr => {
        this.downloadData.status = statusArr[0].status;
      };
      window["updateApp"] = statusArr => {
        bus.$emit(`bindevent_${statusArr.packageName}`, statusArr);
      };
    },
    initStatus() {
      window.downloadAPI &&
        window.downloadAPI.getAppStatus(
          this.downloadData.packag,
          "updateApps" + this.downloadData.appname
        );
    },
    editSize(num) {
      num = parseFloat(num);
      if (num < 1) {
        return (num * 1024).toFixed(0) + "K";
      } else if (num < 1024) {
        return num.toFixed(0) + "M";
      } else {
        return (num / 1024).toFixed(1) + "G";
      }
    },
    viewLink() {
      /*下载*/
      if (!this.isGamebox) {
        /*外部分享*/
        this.$emit("share");
        return;
      }
      let downloadStr = JSON.stringify(this.appInfo);

      switch (this.downloadData.status) {
        case -100 /*网络出错*/:
        case 0 /*初始*/:
        case 101 /* 暂停 */:
          this.$emit("download");
          window.downloadAPI && downloadAPI.downloadApp(downloadStr);
          break;
        case 100 /*下载中*/:
        case 102 /* 等待中 */:
          window.downloadAPI &&
            downloadAPI.pauseDownload(this.appInfo.packageName);
          break;
        case 103: /* 下载成功 */
        case 200 /* 未安装 */:
          window.downloadAPI &&
            downloadAPI.installApp(this.appInfo.packageName);
          break;
        case 202: /* 更新 */
        case 201 /* 已安装 */:
          window.downloadAPI && downloadAPI.launchApp(this.appInfo.packageName);
          break;
      }
      window.downloadAPI &&
        window.downloadAPI.bindEvent("download", "updateApp");
    }
  },
  props: {
    downloadData: {
      /*数据*/
      type: Object,
      required: true,
      validator: function(value) {
        if (value.status == undefined) {
          throw new Error("downloadData需传入初始状态status");
          return false;
        }
        if (value.packag == undefined) {
          throw new Error("downloadData需传入初始状态packag");
          return false;
        }
        if (value.appname == undefined) {
          throw new Error("downloadData需传入初始状态appname");
          return false;
        }
        if (value.size == undefined) {
          throw new Error("downloadData需传入初始状态size");
          return false;
        }
        if (value.md5_file == undefined) {
          throw new Error("downloadData需传入初始状态md5_file");
          return false;
        }
        if (value.downurl == undefined) {
          throw new Error("downloadData需传入初始状态downurl");
          return false;
        }
        return true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>

</style>
