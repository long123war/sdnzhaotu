<template>
  <view class="home">
    <view class="tab-title">
      <view class="tab-title-inner">
        <uni-segmented-control
          :current="current"
          :values="items.map((v) => v.title)"
          @clickItem="onClickItem"
          styleType="text"
          activeColor="#D72565"
        >
        </uni-segmented-control>
      </view>
      <view class="tab-title-search">
        <view class="iconfont iconsearch"></view>
      </view>
    </view>

    <view class="content">
      <!-- 推荐 -->
      <view v-if="current === 0">
        <homeRecommend></homeRecommend>
      </view>
      <!-- 分类 -->
      <view v-if="current === 1">
        <homeXategory></homeXategory>
      </view>
      <!-- 最新 -->
      <view v-if="current === 2">
        <homeNew></homeNew>
      </view>
      <!-- 专辑 -->
      <view v-if="current === 3">
        <homeAlbum></homeAlbum>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./home-album/index";
import homeXategory from "./home-category/index";
import homeNew from "./home-new/index";
import homeRecommend from "./home-recommend/index";
// uni-ui
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    homeAlbum,
    homeXategory,
    homeNew,
    homeRecommend,
    uniSegmentedControl,
  },
  data() {
    return {
      // 保存tab栏的索引值
      current: 0,
      // tab栏数组
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
    };
  },
  methods: {
    onClickItem(e) {
      console.log(e);
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  onLoad() {},
};
</script>

<style lang="scss">
.home {
  .tab-title {
    position: relative;

    .tab-title-inner {
      width: 60%;
      margin: 0 auto;
    }
    .tab-title-search {
      .iconsearch {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
