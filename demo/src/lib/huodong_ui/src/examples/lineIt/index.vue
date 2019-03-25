<template>
  <div class="guessPic">
    <Example :info="exampleInfo.info"
      :tableInfo="exampleInfo.tableInfo"
      :code="exampleInfo.code">
      <lineIt 
      :color='"#83fcff"' 
      :blur='2'
      :shadowColor='"#38d9ff"'
      :errorColor='"red"'
      :errorshadowColor='"red"'
      :target='"circle"'
      :question = 'question[curQuestion]'
      >
          <div slot='cell' class="circle"></div>
      </lineIt>
    </Example>
  </div>
</template>
<script>
import Example from "../../components/example/index";
import lineIt from '../../packages/lineIt/lineIt.vue'
export default {
  components: { Example, lineIt },
  data() {
    return {
      exampleInfo: {
        info: {
          title: "连线游戏",
          author: "fupengcheng",
          tip:
            "组织关卡数组，实现连线游戏"
        },
        code: ``,
        tableInfo: {
          attributes: [
            {
              propName: "gameData",
              explain:
                "本题的游戏数据，必须包含{answer:[备选项的数组],answerNum:答案框的个数}",
              type: "Object",
              default: "-",
              required: "true"
            }
          ],
          events: [
            {
              eventsName: "chooseOver",
              explain: "全部选项选择后的回调",
              arguments: "[{选择后的结果数组}]"
            }
          ],
          slot: [
            {
              slotName: "img",
              explain: "图片插槽"
            }
          ]
        }
      },
      curQuestion: 0,
       question: [
        {
          map:{
            row: 3,
            col: 3
          },
          answer: '12657',
          questions:
            "12657,12658,12659,12674,12675,12678,12683,12684,12685,12687,12689,12694,14259,14267,14268,14269,14276,14329,14368,14367,15268,15267,15348,15349,15367,15672,15684,15694,16842,16843,16849,16857,18692,18627,18624,24961,24861,24876,24961,24983,26843,26851,26349,26348,26183,26189,27483,27486,27438,27618,27615,27684,29436,29843,34816,34967,35276,35486,35492,35429,34892,38942,48927,43681"
        },
        {
          map:{
            row: 4,
            col: 3
          },
          answer: '12657',
          questions:
            "12657,12658,12659,12674,12675,12678,12683,12684,12685,12687,12689,12694,14259,14267,14268,14269,14276,14329,14368,14367,15268,15267,15348,15349,15367,15672,15684,15694,16842,16843,16849,16857,18692,18627,18624,24961,24861,24876,24961,24983,26843,26851,26349,26348,26183,26189,27483,27486,27438,27618,27615,27684,29436,29843,34816,34967,35276,35486,35492,35429,34892,38942,48927,43681"
        }
       ]
    };
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .guess-pic {
    .guess-pic_answer-wrap {
      text-align: left;
    }
    .guess-pic_img {
      @include whr(580,326);
      border: re(6) solid #c0f5ff;
      display: inline-block;
      @include placeHold(580,326);
      background-size: 100% 100%;
    }
    .title {
      font-size: re(18);
    }
    .guess-pic_choose,
    .guess-pic_answer {
      cursor: pointer;
      @include whr(40,40);
      background: lightgrey;
      margin: re(10) re(20);
      display: inline-block;
      font-size: re(24);
      color: #c0f5ff;
      position: relative;
      line-height: re(40);
      text-align: center;
      color: black;
      vertical-align: middle;
      &.isChoose {
        color: red;
        font-size: 0;
      }
      &.isHint {
        color: red;
      }
    }
    .guess-pic_hint-btn {
      padding: re(10) re(20);
      display: inline-block;
      position: relative;
      margin-top: re(10);
      background: lightgrey;
      font-size: re(20);
      line-height: 1;
    }
  }
  .circle {
        width: re(30);
        height: re(30);
        border: 1px solid #333333;
        background-color: #fff;
        margin: 0 auto re(30);
        border-radius: 50%;
        position: relative;
        line-height: re(30);
        .value {
          color: #333333;
          font-size: re(18);
        }
        &.active {
          border-color: lightseagreen;
          .value {
            color: lightseagreen;
          }
        }
      }
</style>


