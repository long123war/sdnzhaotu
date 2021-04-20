export default (parms) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: "加载中",
    });
    wx.request({
      ...parms,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};
