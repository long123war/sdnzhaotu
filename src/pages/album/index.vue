<template>
  <view>
    <!-- 专辑封面开始 -->
    <view class="album-cover">
      <view class="album-img">
        <image :src="album.cover" mode="widthFix" />
      </view>
      <view class="album-info">
        <view class="album-info-des">{{ album.name }}</view>
        <view class="album-info-btn">关注专辑</view>
      </view>
    </view>
    <!-- 专辑封面结束 -->
    <!-- 专辑作者开始 -->
    <view class="album-author">
      <view class="album-author-info">
        <view class="album-author-info-img">
          <image :src="album.user.avatar" mode="heightFix" />
        </view>
        <view class="album-author-info-name">
          <text>{{ album.user.name }}</text>
        </view>
      </view>
      <view class="album-author-des">
        <text>{{ album.desc }}</text>
      </view>
    </view>
    <!-- 专辑作者结束 -->
    <!-- 图片墙开始 -->
    <view class="album-wallpaper">
      <view
        class="album-wallpaper-img"
        v-for="item in wallpaper"
        :key="item._id"
      >
        <image
          :src="item.thumb + item.rule.replace('$<Height>', 360)"
          mode="widthFix"
        />
      </view>
    </view>
    <!-- 图片墙结束 -->
  </view>
</template>

<script>
export default {
  onLoad(options) {
    console.log(options);
    this.id = options.id;
    this.getList();
  },
  data() {
    return {
      parms: {
        // 获取多少条
        limit: 30,
        // 固定写法
        order: "new",
        // 跳过几条
        skip: 0,
        // 是否第一次请求
        first: 1,
      },
      // 专辑id
      id: "1",
      // 专辑封面内容
      album: {},
      // 专辑图片墙
      wallpaper: [],
    };
  },
  methods: {
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.parms,
      }).then((result) => {
        console.log(this.id);
        console.log(result);
        this.album = result.res.album;
        this.wallpaper = result.res.wallpaper;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.album-cover {
  position: relative;
  .album-img {
    image {
    }
  }

  .album-info {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #fff;
    padding: 20rpx 32rpx;
    .album-info-des {
      font-size: 40rpx;
    }

    .album-info-btn {
      background-color: $color;
      border-radius: 10rpx;
      width: 150rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.album-author {
  padding: 15rpx;
  .album-author-info {
    display: flex;
    .album-author-info-img {
      image {
        width: 50rpx;
        height: 50rpx;
      }
    }

    .album-author-info-name {
      margin: 0 15rpx;

      text {
        font-weight: 600;
      }
    }
  }

  .album-author-des {
    padding: 10rpx 0;
    text {
    }
  }
}

.album-wallpaper {
  display: flex;
  flex-wrap: wrap;
  .album-wallpaper-img {
    border: 3rpx #fff solid;
    width: 33.33%;
    image {
    }
  }
}
</style>
