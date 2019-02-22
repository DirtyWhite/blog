<script lang='tsx'>
  import { Component, Watch, Vue, Prop } from "vue-property-decorator";
  @Component({
    components: {}
  })
  export default class Loading extends Vue {
    render(h) {
      return (
        <div class="loading-container">
          <div class="bg">
            <div class="loading" />
            <div class="loading-text">加载中...</div>
          </div>
        </div>
      );
    }
  }
</script>


<style lang='scss' scoped>
  @function re($px) {
    @return $px / 40 + rem;
  }

  .loading-container {
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .bg {
      background-color: rgba(0, 0, 0, 0.7);
      width: re(260);
      height: re(180);
      border-radius: re(16);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 0;
    }
    .loading {
      transition: all 0.3s linear;
      margin: re(30) auto 0;
      border-radius: 50%;
      border: re(7) solid #d1b297;
      border-top: re(7) solid #90665b;
      width: re(80);
      height: re(80);
      animation: loading 1s linear infinite;
    }
    .loading-text {
      text-align: center;
      font-size: re(24);
      margin-top: re(15);
      color: #d1b297;
    }
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
