<template>
  <scroll-view class="album-warp" scroll-y @scrolltolower="handleTolower">
    <!-- 轮播图开始 -->
    <swiper
      class="swiper-album"
      :indicator-dots="true"
      :autoplay="true"
      :interval="2000"
      :duration="500"
    >
      <swiper-item v-for="item in banneeList" :key="item.id">
        <view class="swiper-album-item">
          <image :src="item.thumb" mode="widthFix" />
        </view>
      </swiper-item>
    </swiper>
    <!-- 轮播图结束 -->

    <!-- 专辑开始 -->
    <view class="album-main">
      <navigator
        class="album-info"
        v-for="item in albumList"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album-info-img">
          <image :src="item.lcover" mode="aspectFill" />
        </view>
        <view class="album-info-text">
          <view class="album-info-title">{{ item.name }}</view>
          <view class="alubm-info-des">{{ item.desc }}</view>
          <view class="alubm-info-btn">
            <text class="alubm-info-btn-attack">关注</text>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 专辑结束 -->
  </scroll-view>
</template>

<script>
export default {
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑",
    });
    this.getList();
  },
  data() {
    return {
      // 请求参数
      parms: {
        // 获取多少条
        limit: 30,
        // 固定写法
        order: "new",
        // 跳过几条
        skip: 0,
      },
      // 轮播图列表
      banneeList: [],
      // 专辑列表
      albumList: [],
    };
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album", //仅为示例，并非真实接口地址。
        data: this.parms,
      }).then((result) => {
        console.log(result);
        // 储存拿到的数据
        // 如果是第一次拿数据
        if (this.banneeList.length === 0) {
          this.banneeList = result.res.banner;
        }
        // 如果album长度为0，代表宜家到底部了
        if (result.res.album.length === 0) {
          uni.showToast({
            title: "到底部啦",
            duration: 2000,
            icon: "none",
          });
        } else {
          this.albumList = [...this.albumList, ...result.res.album];
        }
      });
    },
    handleTolower() {
      // 如果还有数据，跳过的数量，扥估上次列表的数量。累计
      this.parms.skip += this.parms.limit;
      // 再次请求获取数据
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.album-warp {
  height: calc(100vh - 38px);
}
.swiper-album {
  height: calc(750rpx / 2.26);
}

.album-main {
  .album-info {
    display: flex;
    padding: 10rpx;
    border-bottom: 1rpx #d0d1cf solid;
    .album-info-img {
      flex: 1;
      padding: 10rpx 0;
      image {
        height: 200rpx;
        width: 200rpx;
      }
    }

    .album-info-text {
      flex: 2;
      padding: 10rpx 20rpx;
      overflow: hidden;
      .album-info-title {
        font: 30rpx #000 bold;
        padding-left: 10rpx;
        font-weight: 600;
      }

      .alubm-info-des {
        padding-left: 10rpx;
        font: 20rpx #000 bold;
        padding: 20rpx 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .alubm-info-btn {
        display: flex;
        justify-content: flex-end;
        .alubm-info-btn-attack {
          color: $color;
          border: 1rpx $color solid;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
