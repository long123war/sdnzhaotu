<template>
  <!-- 视频播放页面 -->
  <view class="video-play">
    <!-- 背景图 -->
    <image :src="video.img" mode="aspectFill" />
    <view class="video-warp">
      <!-- 操作按钮开始 -->
      <view class="video-btn">
        <view
          @click="handleMuted"
          :class="[`iconfont`, muted ? `iconjingyin` : `iconshengyin`]"
        ></view>
        <view class="iconfont iconzhuanfa">
          <button open-type="share"></button>
        </view>
      </view>
      <!-- 操作按钮结束 -->

      <!-- 视频播放开始 -->
      <view class="video-play-start">
        <video :src="video.video" object-fit="fill" :muted="muted"></video>
      </view>
      <!-- 视频播放结束 -->

      <!-- 下载开始 -->
      <view class="video-download" @click="handleDownload">
        <text>下载高清</text>
      </view>
      <!-- 下载结束 -->
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    console.log(getApp().globalData);
    this.video = getApp().globalData.video;
  },
  data() {
    return {
      // 视频数据
      video: {},
      // 是否静音
      muted: false,
    };
  },
  methods: {
    // 点击静音按钮
    handleMuted() {
      this.muted = !this.muted;
    },
    // 点击下载
    async handleDownload() {
      await uni.showLoading({
        title: "下载中",
      });
      // 下载视频文件到内存中
      const videoFile = await uni.downloadFile({
        url: this.video.video,
      });
      const { tempFilePath } = videoFile[1];
      // console.log(tempFilePath);
      // 下载视频文件到本地
      const downloadVido = await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
      });
      // console.log(downloadVido);
      await uni.showToast({
        title: "下载完成",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.video-play {
  height: 100%;
  image {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: -1;
  }
  .video-warp {
    position: relative;
    .video-btn {
      display: flex;
      justify-content: flex-end;
      .iconfont {
        background-color: rgba(0, 0, 0, 0.6);
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 45rpx;
      }
      .iconzhuanfa {
        position: relative;
        button {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }

    .video-play-start {
      display: flex;
      justify-content: center;
      video {
        width: 320rpx;
        height: 600rpx;
      }
    }

    .video-download {
      margin: 0 auto;
      width: 320rpx;
      height: 72rpx;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20rpx;
      border: 1rpx solid #fff;
      text {
        color: #fff;
      }
    }
  }
}
</style>
