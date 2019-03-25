<template>
  <div class="wrap">
    <Example :info="exampleInfo.info"
      :code="exampleInfo.code"
      :tips="exampleInfo.tips"
      :tableInfo="exampleInfo.tableInfo">
      <div class="height">
        <br> 👇
        <br> 👇
        <br> 👇
        <br> 👇
        <br>
      </div>
      <backTop 
        :duration='700'
        @end='handleEnd'>
        <div class="backtop"></div>
      </backTop>
    </Example>
  </div>
</template>

<script>
import backTop from "../../packages/backTop/index.vue";
import Example from "../../components/example/index";
export default {
  data() {
    return {
      exampleInfo: {
        info: {
          title: "回到顶部",
          author: "fupengcheng"
        },
        code: `
        <backTop 
          :parent = ''
          :duration='700'
          :easing = 'easingFunction'
          @end='handleEnd'>
            <div class="backtop"></div>
        </backTop>
            <style lang="scss" scoped>
                  .backtop {
                    position: fixed;
                    bottom: re(30);
                    right: re(30);
                    width: re(50);
                    height: re(50);
                    background-color: #000;
                    border-radius: 50%;
                    cursor: pointer;
                  }
            </style>
          `,
        tips: `在组件插槽中放入回到顶部按钮的样式，需要传入真实滚动的容器选择器。可配置时间、动画曲线，到达顶部后会提供回调函数。当自己设定了滚动的容器时，需要自己传入容器的选择器`,
        tableInfo: {
          attributes: [
            {
              propName: `parent`,
              explain: `滚动的容器`,
              type: `string`,
              default: `html`,
              required: `false`
            },
            {
              propName: `duration`,
              explain: `动画持续时间`,
              type: `number`,
              default: `700`,
              required: `false`
            },
            {
              propName: `easing`,
              explain: `缓动函数`,
              type: `function`,
              default: `easeOutQuart`,
              required: `false`
            }
          ],
          events: [
            {
              eventsName: "end",
              explain: "回到顶部的回调",
              arguments: "-"
            }
          ]
        }
      }
    };
  },
  methods: {
    handleEnd() {
      
    }
  },
  components: { backTop, Example }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .height {
    height: re(1500);
  }
  .backtop {
    position: fixed;
    bottom: re(30);
    right: re(30);
    width: re(50);
    height: re(50);
    background-color: #000;
    border-radius: 50%;
    cursor: pointer;
    z-index: 400;
  }
</style>


