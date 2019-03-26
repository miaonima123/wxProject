// miniprogram/pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_title:[],
    goods_list:[],
    t:true,
    i:0,
    main:0,
    aside:0,
    start: 0,
    start2:0
  },
  
  first(){
    var db = wx.cloud.database();
    db.collection("class_goods").where({
      type:"凤爪翅系列"
    }).get({
      success:(res)=>{
        // console.log(res.data);
        this.setData({
          goods_list:res.data
        })
      }
    })
  },

  getTitle(){
    var db = wx.cloud.database();
    db.collection("class_title").get({
      success: (res) => {
        // console.log(res);
        this.setData({
          list_title:res.data
        })
      }
    })
  },
  setIndex(e){
    var type = e.currentTarget.dataset.type;
    // console.log(type);
    var active = e.currentTarget.dataset.i;
    this.setData({
      i:active
    });
    var db = wx.cloud.database();
    db.collection("class_goods").where({
      type:type
    }).get({
      success:(res)=>{
        // console.log(res.data);
        this.setData({
          goods_list:res.data
        })
      }
    })
  },
  touch1(e){
    console.log(e.target.offsetTop);
    this.setData({ start: e.target.offsetTop})
  },
  test(e){  
    var start =e.changedTouches[0].clientY-this.data.start;
    console.log(start);
    if(start<1){
      this.setData({
        aside: start
      })
    }
  },
  touch2(e){
    this.setData({ start2: e.target.offsetTop});
  },
  test2(e){
    var start = e.changedTouches[0].clientY - this.data.start2;
    if(start<1){
      this.setData({
        main:start
      })
    }
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:"努力加载中..."
    })
    this.getTitle();
    this.first();
    setTimeout(()=>{
      wx.hideLoading();
    },1500)
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

