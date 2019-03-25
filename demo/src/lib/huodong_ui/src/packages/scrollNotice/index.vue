<template>
  <div class="scroll-notice">
    <ul ref="scrollWrap">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import help from "../tools/help";
export default {
  name: "scrollNotice",
  mounted() {
    this.moving();
  },
  methods: {
    moving() {
      let oLis = this.$refs.scrollWrap.children;
      let movingEl = oLis[0].parentNode;
      movingEl.appendChild(oLis[0].cloneNode(true));
      let liHeight = parseFloat(window.getComputedStyle(oLis[0]).height);
      let count = 0;
      let nowTop = 0;

      let move = () => {
        if (count === oLis.length - 1) {
          movingEl.style.webkitTransition = "none";
          movingEl.style.transform = "translateY(0)";
          movingEl.style.webkitTransform = "translateY(0)";
          movingEl.style.webkitBackfaceVisibility = "hidden";
          movingEl.style.webkitTransformStyle = "preserve-3d";
          count = 0;
          nowTop = 0;
        }
        nowTop = nowTop
          ? nowTop - liHeight
          : help.getComputedStyle(movingEl).y - liHeight;
        movingEl.style.webkitTransition = "all 0.8s linear";
        movingEl.style.transition = "all 0.8s linear";
        movingEl.style.webkitTransform = `translateY(${nowTop}px)`;
        movingEl.style.transform = `translateY(${nowTop}px)`;
        movingEl.style.webkitBackfaceVisibility = "hidden";
        movingEl.style.webkitTransformStyle = "preserve-3d";
        count++;
        let continueFn = () => {
          setTimeout(move, 600);
          movingEl.removeEventListener("transitionend", continueFn);
          movingEl.removeEventListener("webkitTransitionEnd", continueFn);
        };
        movingEl.addEventListener("transitionend", continueFn);
        movingEl.addEventListener("webkitTransitionEnd", continueFn);
      };
      move();
    }
  },
  components: {}
};
</script>


