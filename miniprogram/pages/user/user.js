// miniprogram/pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    w:100,
    h:100,
    avatr:"https://6d63-mc-dc4b7e-1258736979.tcb.qcloud.la/user/user (1).png?sign=421bd236380c466d9a60ad1aace5519d&t=1552474633",
    nickName:"",
    avatrStyle:""
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '123',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid);
      wx.showLoading({
        title: '努力加载中...',
        duration:1500
      })
   
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