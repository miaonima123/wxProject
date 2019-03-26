// miniprogram/pages/input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[]
  },
  jump(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  search(e){
    console.log(e.detail.value);
    var main=e.detail.value;
    var db = wx.cloud.database();
    db.collection("input_search").where({
      goods_type:main
    }).get({
      success: (res) => {
        console.log(1,res.data);        
        if(res.data.length!=0){
          this.setData({goodsList:res.data});
          console.log(this.goodsList);
        }else{
          db.collection("input_search").where({
            goods_title: main
          }).get({
            success: (res) => {
              console.log(2,res.data.length);
              if (res.data.length != 0) {
                this.setData({goodsList:res.data})
                console.log(this.goodsList);
              }
            },
            fail: (err) => {
              console.log(err);
            }
          });
        }
      },
      fail:(err)=>{
        console.log(err);
      }
    });
    
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "努力加载中...",
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})