<template>
  <scroll-view
    @scrolltolower="handleTolower"
    class="scroll-warp"
    scroll-y
    v-if="recomment.length > 0"
  >
    <!-- 推荐开始 -->
    <view class="recomment-warp">
      <view class="recomment-item" v-for="item in recomment" :key="item._id">
        <image class="recomment-item-img" :src="item.thumb" mode="widthFix" />
      </view>
    </view>
    <!-- 推荐结束 -->
    <!-- 月份开始 -->
    <view class="month-warp">
      <view class="month-warp-title">
        <view class="month-warp-info">
          <view class="month-warp-date"
            >{{ months.MM }}/
            <text>{{ months.DD }} 月</text>
          </view>
          <view class="month-warp-text">{{ months.title }}</view>
        </view>
        <view class="month-warp-more">
          更多>
        </view>
      </view>
      <view class="month-content">
        <view
          class="month-content-img"
          v-for="item in months.items"
          :key="item.id"
        >
          <image
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
            mode="aspectFill"
          />
        </view>
      </view>
    </view>
    <!-- 月份结束 -->
    <!-- 热门开始 -->
    <view class="hot-warp">
      <view class="hot-title">
        <text>热门</text>
      </view>
      <view class="hot-content">
        <view class="hot-content-img" v-for="item in hots" :key="item._id">
          <image :src="item.thumb" mode="widthFix" />
        </view>
      </view>
    </view>
    <!-- 热门结束 -->
  </scroll-view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // 推荐列表
      recomment: [],
      // 月份列表
      months: {},
      // 热门列表
      hots: [],
      // 请求参数
      parms: {
        // 获取多少条
        limit: 30,
        // 固定写法
        order: "hot",
        // 跳过几条
        skip: 0,
      },
    };
  },
  mounted() {
    this.getList();
    uni.setNavigationBarTitle({
      title: "推荐",
    });
  },
  methods: {
    // 获取数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.parms,
      }).then((result) => {
        console.log(result);
        // 如果第一次拿数据触发
        if (this.recomment.length === 0) {
          // 得到推荐列表
          this.recomment = result.res.homepage[1].items;
          // 得到月份列表
          this.months = result.res.homepage[2];
          // 转化日期
          this.months.MM = moment(this.months.stime).format("MM");
          this.months.DD = moment(this.months.stime).format("DD");
        }

        // 如果请求的热门列表长度为0，证明已经没有更多的图片了。
        if (result.res.vertical.length === 0) {
          // 提示弹窗
          uni.showToast({
            title: "已经到底部了",
            duration: 2000,
            icon: "none",
          });
        } else {
          // 得到热门列表
          this.hots = [...this.hots, ...result.res.vertical];
        }
      });
    },
    handleTolower() {
      // console.log("肥猪爱肥猪猪条条！！");
      // 到底部之后触发加载图片，跳过0,30，60以此类推
      this.parms.skip += this.parms.limit;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-warp {
  height: calc(100vh - 38px);
}
.recomment-warp {
  display: flex;
  flex-wrap: wrap;
  .recomment-item {
    box-sizing: border-box;
    padding: 5rpx;
    width: 50%;
  }
}

.month-warp {
  .month-warp-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 36rpx;
    padding: 20rpx;
    .month-warp-info {
      display: flex;
      font-weight: 600;
      .month-warp-date {
        color: $color;
        text {
          font-size: 30rpx;
        }
      }
      .month-warp-text {
        margin-left: 30rpx;
        color: #666;
      }
    }

    .month-warp-more {
      color: $color;
      font-size: 24rpx;
      font-weight: 600;
    }
  }
  .month-content {
    display: flex;
    flex-wrap: wrap;
    .month-content-img {
      box-sizing: border-box;
      padding: 5rpx;
      width: 33.33%;
    }
  }
}

.hot-warp {
  .hot-title {
    font: 36rpx #666 bold;
    font-weight: 600;
    border-left: 10rpx $color solid;
    margin-left: 10rpx;
    text {
      margin-left: 10rpx;
    }
  }

  .hot-content {
    display: flex;
    flex-wrap: wrap;
    .hot-content-img {
      box-sizing: border-box;
      padding: 5rpx;
      width: 33.33%;
    }
  }
}
</style>
