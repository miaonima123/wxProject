const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:true,
    timer:"",
    play:"block",
    show:"block",
    isPlay:false,
    false:false,
    icon_list: [],
    bg: "",
    news: [
      '平安夜，百人祝福领取苹果~',
      '寒流来袭，你的秋裤准备好了吗？',
      '快收下，新鲜出炉冬季实用穿搭指南~'
    ],
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  getIcon: function () {
    var db = wx.cloud.database();
    db.collection("icon_logo").get({
      success:(res)=>{
        // console.log(res);
        this.setData({
          icon_list:res.data
        })
      }
    })
  },

  jump: function (e) {
    // console.log(e.target.dataset.code)
    var i = e.target.dataset.code;
    if(i==1){
      wx:wx.navigateTo({
        url: '/pages/food/food'
      })
    }
  },
  playVideo(){
    var that=this;
    var video=wx.createVideoContext('myVideo');
    var is = that.data.isPlay;
    if(is){
      video.pause();
      that.setData({
        isPlay:false,
        show:"block",
        timer: setTimeout(function () {
          that.setData({
            play: "block"
          })
        }, 3000)
      })
    }else{
      video.play();
      that.setData({
        isPlay:true,
        show:"none",
        timer: setTimeout(function () {
          that.setData({
            play: "none"
          })
        }, 3000)
      })
      
    }
  },
  show_playicon(){
    this.setData({
      play:"block"
    })
  },


  jump_input(){
    wx.navigateTo({
      url:"/pages/input/input"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIcon();
    
    wx.showLoading({
      title: "努力加载中...",
      duration:1000
    });
    if(!app.globalData.openid){
      wx.showModal({
        title: '授权',
        content: '是否同意小程序获取用户信息',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
   
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