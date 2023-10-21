Page({
  data: {
    logs:[]
  },
  onLoad: function (options) {
    // const db = wx.cloud.database();
    // db.collection('calculation').orderBy('_id', 'desc').limit(10).get({
    //   success: res => {
    //     console.log(res);
    //     this.setData({
    //       logs: res.data
    //     });
    //   },
    //   fail: err => {
    //     console.error(err);
    //   }
    // });
    var alllogs = wx.getStorageSync('calcu-logs');
    this.setData({logs:alllogs});
  }
})
