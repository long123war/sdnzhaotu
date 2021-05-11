<template>
  <view>
    <!-- 用户信息开始 -->
    <view class="user-info">
      <view class="user-info-icon">
        <image :src="imgDetail.user.avatar" mode="widthFix" />
      </view>
      <view class="user-info-title">
        <view class="user-info-title-text">{{ imgDetail.user.name }}</view>
        <view class="user-info-title-time">{{ imgDetail.ctime }}</view>
      </view>
    </view>
    <!-- 用户信息结束 -->
    <!-- 图片详细开始 -->
    <view class="img-detail">
      <swiperAction @SwiperAciton="Swiperimg">
        <image :src="imgDetail.thumb" mode="widthFix" />
      </swiperAction>
    </view>
    <!-- 图片详细结束 -->
    <!-- 点赞收藏开始 -->
    <view class="rank">
      <view class="ranks">
        <text class="iconfont icondianzan">{{ imgDetail.rank }}</text>
      </view>
      <view class="star">
        <text class="iconfont iconshoucang"> 收藏</text>
      </view>
    </view>
    <!-- 点赞收藏结束 -->
    <!-- 最热评论开始 -->
    <view class="hot-comment" v-if="hot.length">
      <view class="hot-comment-title">
        <text class="iconfont iconhot"></text>
        <text class="hot-comment-title-des">最热评论</text>
      </view>
      <view class="hot-comment-warp" v-for="item in hot" :key="item.id">
        <view class="hot-comment-user">
          <view class="hot-usericon">
            <image :src="item.user.avatar" mode="aspectFill" />
          </view>
          <view class="hot-userdes">
            <view class="hot-userdes-name">{{ item.user.name }}</view>
            <view class="hot-userdes-time">{{ item.newtime }}</view>
          </view>
        </view>
        <view class="hot-comment-des">
          <view class="hot-comment-des-connect">{{ item.content }}</view>
          <view class="hot-comment-des-rank">
            <text class="iconfont icondianzan"></text>
            <text class="hot-comment-des-rank-size">{{ item.size }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论结束 -->
    <!-- 最新评论开始 -->
    <view class="new-comment" v-if="comment.length">
      <view class="hot-comment-title">
        <text class="iconfont iconpinglun"></text>
        <text class="hot-comment-title-des">最新评论</text>
      </view>
      <view class="hot-comment-warp" v-for="item in comment" :key="item.id">
        <view class="hot-comment-user">
          <view class="hot-usericon">
            <image :src="item.user.avatar" mode="aspectFill" />
          </view>
          <view class="hot-userdes">
            <view class="hot-userdes-name">{{ item.user.name }}</view>
            <view class="hot-userdes-time">{{ item.newtime }}</view>
          </view>
        </view>
        <view class="hot-comment-des">
          <view class="hot-comment-des-connect">{{ item.content }}</view>
          <view class="hot-comment-des-rank">
            <text class="iconfont icondianzan"></text>
            <text class="hot-comment-des-rank-size">{{ item.size }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论结束 -->
    <!-- 下载按钮开始 -->
    <view class="download-img" @click="downloadImg">
      <view class="download-img-des">下载图片</view>
    </view>
    <!-- 下载按钮结束 -->
  </view>
</template>

<script>
import moment from "moment";
import swiperAction from "@/component/swiperAction";
moment.locale("zh-cn");
export default {
  components: {
    swiperAction,
  },
  data() {
    return {
      // 包含图片作者头像，发布时间等详细信息的对象
      imgDetail: {},
      // 图片显示
      image: "",
      // 图片最新评论
      comment: [],
      // 图片最热评论
      hot: [],
      // 图片索引
      imgIndex: 0,
    };
  },
  mounted() {
    // 显示图片详细内容开始
    console.log(getApp().globalData);
    // 把图片的索引保存下来
    this.imgIndex = getApp().globalData.imgIndex;
    this.getData();
    // 图片详细内容结束
    this.getComment();
  },
  methods: {
    // 由用户查看图片详细的图片id发送请求，获取最热、最新评论等信息。
    getComment() {
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${this.imgDetail.id}/comment`,
      }).then((result) => {
        console.log(result);
        this.comment = result.res.comment;
        this.hot = result.res.hot;
        for (let item of this.hot) {
          item.newtime = moment(item.atime).fromNow();
        }
        for (let item of this.comment) {
          item.newtime = moment(item.atime).fromNow();
        }
      });
    },
    getData() {
      // 把全局属性，图片所在的数组和图片再数组中的索引保存下来。
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.imgIndex];
      // 图片显示
      this.image =
        this.imgDetail.thumb + this.imgDetail.rule.replace("$<Height>", 360);
      // 把时间戳格式转化未XX年前的格式
      this.imgDetail.ctime = moment(this.imgDetail.atime).fromNow();
    },
    // 滑动图片
    Swiperimg(e) {
      const { imgList } = getApp().globalData;
      console.log(e.touchresult);
      console.log(this.imgIndex);
      console.log(imgList.length);
      // 左滑，如果图片索引小于总数组的长度，那么就还可以滑动
      if (e.touchresult === "left" && this.imgIndex < imgList.length - 1) {
        this.imgIndex++;
        this.getData();
        // 右滑，如果图片索引大于0，那么就还可以滑
      } else if (e.touchresult === "right" && this.imgIndex > 0) {
        this.imgIndex--;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          duration: 2000,
          icon: "none",
        });
      }
    },
    async downloadImg() {
      uni.showToast({
        title: "下载中",
        icon: "none",
      });
      // 下载远程文件到小程序内存中
      const filePath = await uni.downloadFile({
        url: this.imgDetail.img,
      });
      const { tempFilePath } = filePath[1];
      console.log(filePath);
      // tempFilePath
      // 将图片从内存中下载到本地
      const tempFile = await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      });
      console.log(tempFile);
      await uni.showToast({
        title: "下载完毕",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  padding: 20rpx;
  .user-info-icon {
    width: 120rpx;
    padding: 0 20rpx;
    image {
      border-radius: 50%;
    }
  }

  .user-info-title {
    .user-info-title-text {
      font-weight: 600;
      color: #000;
    }
    .user-info-title-time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}
.rank {
  display: flex;
  .ranks {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text.iconfont.icondianzan {
      font-size: 28rpx;
    }
  }

  .star {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text.iconfont.iconshoucang {
      font-size: 28rpx;
    }
  }
}
// 最热评论和最新样式
.hot-comment,
.new-comment {
  padding: 10rpx;
  .hot-comment-title {
    display: flex;
    align-items: center;
    padding: 10rpx;
    font-weight: 600;
    .iconfont.iconhot {
      color: rgb(255, 24, 0);
    }
    .iconfont.iconpinglun {
      color: rgb(98, 203, 215);
    }

    .hot-comment-title-des {
      color: rgb(122, 114, 107);
      padding-left: 20rpx;
    }
  }

  .hot-comment-warp {
    padding: 10rpx 0;
    .hot-comment-user {
      display: flex;
      justify-content: center;
      align-items: center;
      .hot-usericon {
        width: 10%;
        image {
          height: 60rpx;
          width: 60rpx;
        }
      }

      .hot-userdes {
        flex: 1;
        padding: 0 10rpx;
        font-size: 24rpx;
        .hot-userdes-name {
          color: rgb(170, 171, 170);
        }
        .hot-userdes-time {
          color: rgb(113, 120, 122);
          font-weight: 600;
        }
      }
    }

    .hot-comment-des {
      padding: 20rpx 0;
      padding-left: 10%;
      display: flex;
      justify-content: space-between;
      border-bottom: 10rpx solid rgb(237, 238, 236);
      .hot-comment-des-connect {
        padding-left: 10rpx;
        font-weight: 600;
        color: #000;
      }

      .hot-comment-des-rank {
        font-size: 18rpx;
      }
    }
  }
}
// 下载图片样式
.download-img {
  height: 90rpx;
  background-color: $color;
  margin: 5rpx 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download-img-des {
    font-weight: 600;
    font-size: 40rpx;
    color: #fff;
  }
}
</style>
