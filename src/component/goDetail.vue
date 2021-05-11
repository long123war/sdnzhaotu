<template>
  <view @click="onHandleDetail">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: ["list", "index"],
  data() {
    return {};
  },
  methods: {
    onHandleDetail() {
      // 换成数据到全局
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;
      // 点击跳转详情页面
      uni.navigateTo({
        url: "/pages/imgDetail/index",
      });
    },
  },
};
</script>

<style></style>
