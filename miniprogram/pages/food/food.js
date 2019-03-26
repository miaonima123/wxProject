// miniprogram/pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:[]
  },
  getFoodsList(){
    var db = wx.cloud.database();
    db.collection("goods_food").limit(12).get({
      success:(res)=>{
        var newFoodList = this.data.foodList.concat(res.data);
        this.setData({
          foodList:newFoodList
        })
      }
    })
  },
  jump_foodInfo(e){
    var pid=e.currentTarget.dataset.i;
    wx.navigateTo({
      url: '/pages/foodsInfo/foodsInfo?pid='+pid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中....',
      duration:2000
    })
    this.getFoodsList();
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
    wx.showLoading({
      title:"努力加载中",
      duration:2000
    })
    var db = wx.cloud.database();
    db.collection("goods_food").limit(12).get({
      success:(res)=>{
        console.log(1);
        this.setData({
          foodList:res.data
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: "努力加载中",
      duration: 1000
    })
    this.getFoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})