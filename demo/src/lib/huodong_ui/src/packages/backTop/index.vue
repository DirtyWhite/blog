<template>
  <transition name='fade'>
    <div ref='backTop'
      v-show='itemShow'>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import moveTo from "./moveTo.js";

export default {
  name: "backTop",
  data() {
    return {
      itemShow: false
    };
  },
  props: ["parent", "duration", "easing"],
  mounted() {
    this.initShow();
    this.backtop();
  },
  methods: {
    initShow() {
      window.onscroll = e => {
        let scroller;
        if (this.parent) {
          scroller = this.parent;
        } else {
          scroller = document.documentElement.scrollTop > document.body.scrollTop ? 
             'html'
            : 'body';
        }
        parent = document.querySelector(scroller);
        let top = parent.scrollTop;
        this.itemShow = top > 10;
      };
    },
    backtop() {
      let backTop = this.$refs.backTop;
      const move = new moveTo({
        target: backTop,
        parent: this.parent,
        duration: this.duration,
        easing: this.easing,
        callback: () => {
          this.$emit("end");
        }
      });
      move;
    }
  }
};
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>

