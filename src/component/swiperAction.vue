<template>
  <view @touchstart="handleStart" @touchend="handleEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 手指触摸屏幕开始坐标
      touchStartx: 0,
      touchStarty: 0,
      // 手指触摸屏幕开始时间
      touchStartTime: 0,
    };
  },
  methods: {
    handleStart(event) {
      // 记录手指坐标
      this.touchStartx = event.changedTouches[0].clientX;
      this.touchStarty = event.changedTouches[0].clientY;
      // 记录开始时间，时间戳
      this.touchStartTime = Date.now();
    },
    handleEnd(event) {
      const touchEndx = event.changedTouches[0].clientX;
      const touchEndy = event.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      let touchresult = "";
      // 如果滑动时间大于2秒，则不算是滑动
      if (touchEndTime - this.touchStartTime > 2000) {
        return;
      }
      // 如果x轴滑动距离大于10，则算是滑动
      if (Math.abs(touchEndx - this.touchStartx) > 10) {
        if (touchEndx - this.touchStartx > 0) {
          touchresult = "right";
        } else {
          touchresult = "left";
        }
      }
      // 把结果发送到父组件
      this.$emit("SwiperAciton", { touchresult });
    },
  },
};
</script>

<style></style>
