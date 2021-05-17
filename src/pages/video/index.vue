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
    <view class="show-video">
      <showVideo :videowp="videowp"></showVideo>
    </view>
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
    onClickItem(e) {
      console.log(e);
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
        if (this.current < 4) {
          this.items[this.current].parms.skip = 0;
          this.videowp = [];
        }
        this.getList();
      } else {
        return;
      }
    },
    getList() {
      this.request({
        url: this.items[this.current].url,
        data: this.items[this.current].parms,
      }).then((result) => {
        console.log(result);
        this.videowp = result.res.videowp;
      });
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
}
</style>
