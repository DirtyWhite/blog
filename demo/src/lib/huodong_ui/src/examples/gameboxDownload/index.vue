<template>
  <div class="wrap">
    <Example :info="exampleInfo.info"
      :code="exampleInfo.code"
      :tips="exampleInfo.tip"
      :tableInfo="exampleInfo.tableInfo">
      <downloadBtn :downloadData="downloadData"
        @share="handleShare">
        <template slot-scope="scope">
          <div class="dm-load clearfix"
            :class="{
                'dm-load-no':scope.current.iconClass=='no',//未下载
                'dm-load-process':scope.current.iconClass=='download'||scope.current.iconClass=='waiting',//下载中
                'dm-load-waiting':scope.current.iconClass=='continue',//已暂停
                'dm-load-install':scope.current.iconClass=='install',//安装中
                'dm-load-end':scope.current.iconClass=='play',//下载安装成功
            }">
            <div class="load-status"></div>
            <div class="load-text">{{downloadData.appname}}</div>
            <div class="load-text">{{scope.current.iconText}}</div>
          </div>
        </template>
      </downloadBtn>
      <downloadBtn :downloadData="downloadData2"
        @share="handleShare">
        <template slot-scope="scope_b">
          <div class="dm-load clearfix"
            :class="{
                'dm-load-no':scope_b.current.iconClass=='no',//未下载
                'dm-load-process':scope_b.current.iconClass=='download'||scope_b.current.iconClass=='waiting',//下载中
                'dm-load-waiting':scope_b.current.iconClass=='continue',//已暂停
                'dm-load-install':scope_b.current.iconClass=='install',//安装中
                'dm-load-end':scope_b.current.iconClass=='play',//下载安装成功
            }">
            <div class="load-status"></div>
            <div class="load-text">{{downloadData2.appname}}</div>
            <div class="load-text">{{scope_b.current.iconText}}</div>
          </div>
        </template>
      </downloadBtn>
    </Example>
  </div>
</template>

<script>
import Example from "../../components/example/index";
import downloadBtn from "../../packages/gameboxDownload/index";
export default {
  data() {
    return {
      downloadData: {
        packag: "com.code666.island",
        appname: "代码岛",
        size: 17.5,
        md5_file: "5cb4c99ca1dea9164e4544798bfdcad7",
        downurl:
          "http://sj2.img4399.com/downloader/codegame/1.4.3/codegame_1.4.3.youxihe.apk",
        status: 0
      },
      downloadData2: {
        packag: "com.jianyou.jszzj.m4399",
        appname: "僵尸榨汁机",
        size: 54.98,
        md5_file: "9450d1c576cd7fe4a335319981cf1aa9",
        downurl:
          "http://mobi.4399tech.com/redirect/proxy.docker.4399api.net/test/t1sj/testsjimg/game_list/487/com.jianyou.jszzj.m4399/game.v46996.apk",
        status: 0
      },
      exampleInfo: {
        info: {
          title: "游戏盒内下载其他app",
          author: "gaofanni"
        },
        tip:
          "需用template包裹起来，用与取得内部传出参数，示范列表情况，代码仅有一个",
        code: `
                <downloadBtn :downloadData="downloadData"
                  @share="handleShare">
                  <template slot-scope="scope">
                    <div class="dm-load clearfix"
                      :class="{
                          'dm-load-no':scope.current.iconClass=='no',//未下载
                          'dm-load-process':scope.current.iconClass=='download'||scope.current.iconClass=='waiting',//下载中
                          'dm-load-waiting':scope.current.iconClass=='continue',//已暂停
                          'dm-load-install':scope.current.iconClass=='install',//安装中
                          'dm-load-end':scope.current.iconClass=='play',//下载安装成功
                      }">
                      <div class="load-status"></div>
                      <div class="load-text">{{downloadData.appname}}</div>
                      <div class="load-text">{{scope.current.iconText}}</div>
                    </div>
                  </template>
                </downloadBtn>
                
                <script>
                  export default {
                    data(){
                      return {
                        downloadData: {
                          packag: "com.code666.island",
                          appname: "代码岛",
                          size: 17.5,
                          md5_file: "5cb4c99ca1dea9164e4544798bfdcad7",
                          downurl:
                            "http://sj2.img4399.com/downloader/codegame/1.4.3/codegame_1.4.3.youxihe.apk",
                          status: 0
                        }
                      }
                    },
                    methods:{
                      handleShare() {
                        alert("share");
                      }
                    }
                  }
                <\/script>
        `,
        tableInfo: {
          attributes: [
            {
              propName: "downloadData",
              explain: `下载所需包信息，必须包含{packag,appname,size,md5_file,downurl,status}参数`,
              type: "Object",
              required: "true"
            }
          ],
          events: [
            {
              eventsName: "share",
              explain: "分享页点击的回调",
              arguments: "-"
            }
          ]
        }
      }
    };
  },
  methods: {
    handleShare() {
      alert("share");
    }
  },
  components: { downloadBtn, Example }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .dm-load {
    width: re(143);
    height: 100%;
    display: inline-block;
    .load-status {
      margin: re(22) auto 0;
      font-size: re(22);
      @include whr(70,70);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: inline-block;
    }
    .load-text {
      margin-top: re(10);
      text-align: center;
      font-size: re(20);
      line-height: 1;
    }
  }
  // 没有下载
  .dm-load-no {
    .load-status {
      background-image: url("./images/icon_download_nl.png");
      &:active {
        background-image: url("./images/icon_download_hl.png");
      }
    }
    .load-text {
      color: #54ba3e;
    }
  }
  // 下载中
  .dm-load-process {
    .load-status {
      background-image: url("./images/icon_downloading_nl.png");
      &:active {
        background-image: url("./images/icon_downloading_hl.png");
      }
    }
    .load-text {
      color: #54ba3e;
    }
  }
  // 下载完
  .dm-load-end {
    .load-status {
      background-image: url("./images/icon_downloaded.png");
    }
    .load-text {
      color: #54ba3e;
    }
  }
  // 安装中
  .dm-load-install {
    .load-status {
      background-image: url("./images/icon_install_nl.png");
    }
    .load-text {
      color: #ffad2d;
    }
  }
  // 已暂停
  .dm-load-waiting {
    .load-status {
      background-image: url("./images/icon_waiting.png");
    }
    .load-text {
      color: #c3c3c3;
    }
  }
</style>


