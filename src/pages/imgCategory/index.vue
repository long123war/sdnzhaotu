<template>
  <view class="imgcategory">
    <!-- tab栏开始 -->
    <view class="imgcategory-title">
      <uni-segmented-control
        class="imgcategory-title-inner"
        :current="current"
        :values="items.map((v) => v.title)"
        styleType="text"
        activeColor="#D72565"
        @clickItem="clickItem"
      >
      </uni-segmented-control>
    </view>
    <!-- tab栏结束 -->
    <!-- 图片展示区开始 -->
    <scroll-view
      class="imgcategory-connect"
      scroll-y
      enable-flex
      @scrolltolower="handleTolower"
    >
      <view
        class="imgcategory-connect-img"
        v-for="item in imgList"
        :key="item.id"
      >
        <image :src="item.thumb" mode="aspectFill" />
      </view>
    </scroll-view>
    <!-- 图片展示区结束 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  components: {
    uniSegmentedControl,
  },
  onLoad(op) {
    console.log(op);
    this.id = op.id;
    this.getList();
  },
  data() {
    return {
      //用户点击的图片id
      id: "",
      // 请求参数对象
      prams: {
        limit: 30,
        skip: 0,
        order: "new",
      },
      // 分段器索引
      current: 0,
      // tab栏数组
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" },
      ],
      // 请求获取的分类图片
      imgList: [],
    };
  },
  methods: {
    // 请求数据
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.prams,
      }).then((result) => {
        console.log(result);
        // 如果请求有图片的话
        if (result.res.vertical.length) {
          // 保存请求回来的图片数组
          this.imgList = [...this.imgList, ...result.res.vertical];
        } else {
          uni.showToast({
            title: "没有数据了",
            duration: 2000,
            icon: "none",
          });
        }
      });
    },
    // 点击tab栏
    clickItem(e) {
      console.log(e);

      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        // 清空图片数组
        this.imgList = [];
        // 跳过数量重制为0
        this.prams.skip = 0;
        // 更改请求的关键词
        this.prams.order = this.items[this.current].order;
        this.getList();
      } else {
        return;
      }
    },
    // 触底
    handleTolower() {
      this.prams.skip += this.prams.limit;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
// tab区域
.imgcategory {
  .imgcategory-title {
    width: 60%;
    margin: 0px auto;
    .imgcategory-title-inner {
    }
  }
}
// 图片主区域
.imgcategory-connect {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .imgcategory-connect-img {
    width: 33.33%;
    box-sizing: border-box;
    padding: 5rpx;
    image {
      width: 100%;
    }
  }
}
</style>
