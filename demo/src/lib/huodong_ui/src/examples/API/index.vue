<template>
  <div class="wrap">
    <div class="searchBar">
      <input type="text"
        placeholder="请输入关键字"
        @input='search'
        v-model='keyword'>
      <button class="empty"
        @click='empty'>清空</button>
    </div>
    <div class="tab">
      <a @click='current = "youpai"'
        :class='{active:current == "youpai"}'>游拍</a>
      <a @click='current = "gameBox"'
        :class='{active:current == "gameBox"}'>游戏盒</a>
    </div>
    <section class="API youpai"
      v-show='current=="youpai"'>
      <ul class="list">
        <li v-for='(item,index) in youPai'
          name='item.name'
          v-show='item.show'>
          <p class="funcName">{{item.name}}()</p>
          <p class="funcExplain">{{item.value && item.value.explain || ''}}</p>
          <p class="version"
            v-show='item.value && item.value.version'>{{item.value && item.value.version}}</p>
          <pre class="demo"
            v-html='item.value && item.value.demo'></pre>
          <button class="demoBtn"
            @click='item.value && item.value.run()'>测试</button>
        </li>
      </ul>
    </section>
    <section class="API youpai"
      v-show='current=="gameBox"'>
        <ul class="list">
        <li v-for='(item,index) in gameBox'
          name='item.name'
          v-show='item.show'>
          <p class="funcName">{{item.name}}()</p>
          <p class="funcExplain">{{item.value && item.value.explain || ''}}</p>
          <p class="version"
            v-show='item.value && item.value.version'>{{item.value && item.value.version}}</p>
          <pre class="demo"
            v-html='item.value && item.value.demo'></pre>
          <button class="demoBtn"
            @click='item.value && item.value.run()'>测试</button>
        </li>
      </ul>
      </section>
  </div>
</template>

<script>
import ypAPI from "./youPai_example.js";
import gameBoxAPI from "./gameBox_example.js";
export default {
  name: "API",
  sideBar: false,
  data() {
    return {
      current: "youpai",
      keyword: "",
      youPai: [],
      gameBox: []
    };
  },
  mounted() {
    this.renderYouPai();
    this.renderGameBox();
  },
  methods: {
    renderYouPai() {
      let youPai = [];
      let keys = Object.keys(ypAPI);
      for (let i in keys) {
        let key = keys[i];
        let value = ypAPI[key];
        let show = true;
        youPai.push({
          name: key,
          value: value,
          show
        });
      }
      this.youPai = youPai;
    },
    renderGameBox() {
      let gameBox = [];
      let keys = Object.keys(gameBoxAPI);
      for (let i in keys) {
        let key = keys[i];
        let value = gameBoxAPI[key];
        let show = true;
        gameBox.push({
          name: key,
          value: value,
          show
        });
      }
      this.gameBox = gameBox;
    },
    empty() {
      this.keyword = "";
      this.search();
    },
    search() {
      let keyword = this.keyword.toLowerCase();
      this.youPai.map((el, index) => {
        let name = el.name.toLowerCase();
        let explain = el.value.explain.toLowerCase();
        let demo = el.value.demo.toLowerCase();

        if (
          name.indexOf(keyword) > -1 ||
          explain.indexOf(keyword) > -1 ||
          demo.indexOf(keyword) > -1
        ) {
          el.show = true;
        } else {
          el.show = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .searchBar {
    // background-color:#888;
    position: relative;
    overflow: hidden;
    text-align: left;
    padding-left: re(50);
    input {
      // background-color: #333;
      display: inline-block;
      width: re(200);
      height: re(30);
      border-radius: re(4);
      border: re(1) solid #888;
      font-size: re(13);
      padding: 0 re(10);
      color: #333;
    }
    .empty {
      background-color: #f8f8f8;
      display: inline-block;
      width: re(60);
      height: re(20);
      border-radius: re(4);
      font-size: re(14);
      cursor: pointer;
      margin-left: re(10);
      &:active {
        transform: scale(0.95);
      }
    }
  }
  .wrap {
    width: re(640);
    // box-shadow: 0 0 re(10) rgba(100, 100, 100, 0.2);
    margin: 0 auto;
    background: white;
    padding: re(20) 0;
    font-size: re(16);
  }
  .tab {
    margin-top: re(50);
    margin-bottom: re(30);
  }
  .tab a {
    color: #555;
    font-size: re(30);
    margin: re(10);
    cursor: pointer;
    &.active {
      color: #000;
      font-weight: bold;
    }
    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 0.5;
    }
  }
  .list {
    text-align: left;
    margin-left: re(40);
    li {
      margin-bottom: re(5);
    }
    .funcName {
      font-size: re(20);
      font-weight: bold;
      margin-bottom: re(15);
    }
    .funcExplain {
      font-size: re(15);
      margin-bottom: re(5);
      color: #555;
      margin-left: re(20);
    }
    .demo {
      font-family: "microsoft yahei";
      font-size: re(15);
      margin-left: re(-30);
      margin-top: re(-10);
    }
    .demoBtn {
      @include whr(100,30);
      background-color: #f8f8f8;
      margin: re(20) auto;
      line-height: re(30);
      padding: 0 re(5);
      border-radius: re(5);
      font-size: re(14);
      color: #646464;
      box-shadow: 0 0 re(3) rgba(0, 0, 0, 0.14);
      cursor: pointer;
      transition: transform 0.05s linear;
      &:active {
        transform: scale(0.98);
      }
    }
  }
</style>
