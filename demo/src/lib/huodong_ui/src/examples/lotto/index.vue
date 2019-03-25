<template>
  <div class="wrap">
    <Example :info="exampleInfo.info"
      :code="exampleInfo.code"
      :tableInfo='exampleInfo.tableInfo'>
      <lotto ref="lotto"
        :num='scrollNum'>
        <div class="box"
          :slot='`box${index}`'
          v-for="(ele,index) in scrollNum">
          <div class="content">
            <ul>
              <li class="goods"
                v-for="(item,index) in rewardList"
                :class="`gift-${item.key}`"></li>
            </ul>
          </div>
        </div>
      </lotto>
      <div class='btn btn-begin'
        @click="gameBeginFn(true)">我要中奖</div>
      <div class='btn btn-begin'
        @click="gameBeginFn(false)">我不要中奖</div>
    </Example>
  </div>
</template>

<script>
import lotto from "../../packages/lotto/index";
import Example from "../../components/example/index";
export default {
  data() {
    return {
      exampleInfo: {
        info: {
          title: "抽奖大乐透",
          author: "gaofanni",
          tip:
            "初始状态滚动展示抽奖结果，点击抽奖由组件外部传入抽奖结果，组件内部进行处理展示，抽奖结束后，继续滚动展示"
        },
        code: `
                      <Lotto ref="lotto"
                        :num='scrollNum'>
                        <div class="box"
                          :slot="'box'+index"
                          v-for="(ele,index) in scrollNum">
                          <div class="content">
                            <ul>
                              <li class="goods"
                                v-for="(item,index) in rewardList"
                                :class="'gift-'+item.key"></li>
                            </ul>
                          </div>
                        </div>
                      </Lotto>
                      <div class='btn btn-begin'
                        @click="gameBeginFn(true)">我要中奖</div>
                      <div class='btn btn-begin'
                        @click="gameBeginFn(false)">我不要中奖</div>

                      <script>
                          export default {
                              data() {
                                return {
                                    rewardList: [
                                      {
                                          key: "sizhongfen"
                                      },
                                      {
                                          key: "cake"
                                      },
                                      {
                                          key: "shengrikuaile"
                                      },
                                      {
                                          key: "laosiji"
                                      },
                                      {
                                          key: "shoujizhijia"
                                      },
                                      {
                                          key: "baozhen"
                                      },
                                      {
                                          key: "bangbangtang"
                                      },
                                      {
                                          key: "gouliang"
                                      }
                                    ],
                                    scrollNum: 3
                                };
                              },
                              methods: {
                                  async gameBeginFn(type) {
                                    if (type) {
                                      let res = Math.round(Math.random() * (this.rewardList.length - 1));
                                      await this.$refs.lotto.gameBegin(res);
                                      alert("抽取到的结果为" + res);
                                    } else {
                                      await this.$refs.lotto.gameBegin();
                                      alert("这么惨没中奖");
                                    }
                                  }
                              },
                          }
                      <\/script>`,
        tableInfo: {
          attributes: [
            {
              propName: "num",
              explain: `抽奖单元个数`,
              type: `Number`,
              default: `3`,
              required: "false"
            }
          ],
          methods: [
            {
              name: "gameBegin",
              explain: "调用开始抽奖",
              param:
                "抽取结果rewardList的index，从0开始，没传(undefined)为不中奖"
            }
          ]
        }
      },
      rewardList: [
        {
          key: "sizhongfen"
        },
        {
          key: "cake"
        },
        {
          key: "shengrikuaile"
        },
        {
          key: "laosiji"
        },
        {
          key: "shoujizhijia"
        },
        {
          key: "baozhen"
        },
        {
          key: "bangbangtang"
        },
        {
          key: "gouliang"
        }
      ],
      scrollNum: 3
    };
  },
  methods: {
    async gameBeginFn(type) {
      if (type) {
        let res = Math.round(Math.random() * (this.rewardList.length - 1));
        await this.$refs.lotto.gameBegin(res);
        alert("抽取到的结果为" + res);
      } else {
        await this.$refs.lotto.gameBegin();
        alert("这么惨没中奖");
      }
    }
  },
  components: { lotto, Example }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  $base: "./images/";
  .box {
    display: inline-block;
    @include whr(167, 175);
    line-height: re(175);
    @include bg("bg-lotto.png");
    margin: 0 re(5);
    position: relative;
    overflow: hidden;
    .content {
      height: 82%;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
    }
    .goods {
      @include whr(163, 160);
      &.gift-bangbangtang {
        @include bg("gift-bangbangtang-s.png");
      }
      &.gift-baozhen {
        @include bg("gift-baozhen-s.png");
      }
      &.gift-cake {
        @include bg("gift-cake-s.png");
      }
      &.gift-gouliang {
        @include bg("gift-gouliang-s.png");
      }
      &.gift-laosiji {
        @include bg("gift-laosiji-s.png");
      }
      &.gift-shengrikuaile {
        @include bg("gift-shengrikuaile-s.png");
      }
      &.gift-shoujizhijia {
        @include bg("gift-shoujizhijia-s.png");
      }
      &.gift-sizhongfen {
        @include bg("gift-sizhongfen-s.png");
      }
    }
  }
  .btn-begin {
    @include whr(255, 54);
    display: inline-block;
    margin-top: re(22);
    background-color: burlywood;
    line-height: re(54);
    &.act {
      @include bg("btn_lotto_act.png");
    }
  }
</style>
