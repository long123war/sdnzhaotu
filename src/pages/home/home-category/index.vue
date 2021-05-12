<template>
  <view class="category-warp">
    <navigator
      class="category-img"
      v-for="item in categoryImg"
      :key="item.id"
      :url="`/pages/imgCategory/index?id=${item.id}`"
    >
      <image :src="item.cover" mode="aspectFill" />
      <text>{{ item.name }}</text>
    </navigator>
  </view>
</template>

<script>
export default {
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类",
    });
    this.getList();
  },
  data() {
    return {
      categoryImg: [],
    };
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category",
      }).then((result) => {
        console.log(result);
        this.categoryImg = result.res.category;
      });
    },
  },
};
</script>

<style lang="scss">
.category-warp {
  display: flex;
  flex-wrap: wrap;
  .category-img {
    width: 33.33%;
    position: relative;
    image {
      border: 5rpx solid #fff;
      height: 240rpx;
    }

    text {
      width: 100%;
      position: absolute;
      padding-left: 20rpx;
      bottom: 5rpx;
      color: #fff;
      font-size: 40rpx;
      font-weight: 400;
      background-image: linear-gradient(
        to right,
        rgba(105, 105, 105, 1),
        rgba(255, 255, 255, 0)
      );
    }
  }
}
</style>
