<template>
  <view class="video">
    <!-- tab栏开始 -->
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
    <!-- tab栏结束 -->
    <!-- 视频展示区开始 -->
    <scroll-view class="show-video" @scrolltolower="handleTolower" scroll-y>
      <showVideo :videowp="videowp"></showVideo>
    </scroll-view>
    <!-- 视频展示区结束 -->
  </view>
</template>

<script>
// uni-ui
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import showVideo from "./showVideo/index.vue";
export default {
  components: {
    uniSegmentedControl,
    showVideo,
  },
  onLoad() {
    this.getList();
  },
  data() {
    return {
      // 请求获取的视频数据
      videowp: [],
      // 保存tab栏的索引值
      current: 0,
      // tab栏数组
      items: [
        {
          title: "推荐",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
          parms: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "娱乐",
          url:
            "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
          parms: { limit: 30, skip: 0, order: "new" },
        },
        {
          title: "最新",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          parms: { limit: 30, skip: 0, order: "new" },
        },
        {
          title: "热门",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          parms: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "分类",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
          parms: {},
        },
      ],
    };
  },
  methods: {
    // 点击tab触发
    onClickItem(e) {
      console.log(e);
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
        // 如果tab烂选的是前4个，把对应索引的tab菜单跳过值重新设置为0，视频数据数组设置为0
        if (this.current < 4) {
          this.items[this.current].parms.skip = 0;
          this.videowp = [];
        }
        this.getList();
      } else {
        return;
      }
    },
    // 获取数据
    getList() {
      this.request({
        url: this.items[this.current].url,
        data: this.items[this.current].parms,
      }).then((result) => {
        console.log(result);
        // 保存请求回来的视频数据
        if (result.res.videowp.length === 0) {
          uni.showToast({
            title: "没有数据了",
            duration: 2000,
            icon: "none",
          });
        } else {
          this.videowp = [...this.videowp, ...result.res.videowp];
        }
      });
    },
    // 触底触发
    handleTolower() {
      this.items[this.current].parms.skip += this.items[
        this.current
      ].parms.limit;
      this.getList();
    },
  },
};
</script>

<style lang="scss">
.video {
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
  .show-video {
    height: calc(100vh - 36px);
  }
}
</style>
