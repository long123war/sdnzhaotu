<template>
  <view class="show-video">
    <view
      class="video-img"
      v-for="item in videowp"
      :key="item.id"
      @click="goVideoPlay(item)"
    >
      <image :src="item.img" mode="aspectFill" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    videowp: Array,
  },
  methods: {
    goVideoPlay(item) {
      getApp().globalData.video = item;
      // 点击跳转详情页面
      uni.navigateTo({
        url: "/pages/videoPlay/index",
      });
    },
  },
};
</script>

<style lang="scss">
.show-video {
  display: flex;
  flex-wrap: wrap;
  .video-img {
    width: 33.33%;
    image {
      border: 5rpx solid #fff;
    }
  }
}
</style>
