<template>
  <view class="show-video">
    <view class="video-img" v-for="item in videowp" :key="item.id">
      <image :src="item.img" mode="aspectFill" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    videowp: Array,
  },
};
</script>

<style></style>
