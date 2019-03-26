// miniprogram/pages/foodsInfo/foodsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    main:[],
    swiper:[],
    price:0,
    title:"",
    cart_img:"",
    count:1,
    pid:0
  },

  onShareAppMessage:function(res){
  //   if(res.data==='button'){
  //   }return {
  //     title:'转发',
  //     path:'/pages/index/index',
  //     success:function(res){
  //     }
  //   };
  //  this.setData({
  //    bg:false,
  //    to1:false
  //  });
  //  wx.showLoading({
  //    title: '分享成功',
  //  });
    return {
      title:'转发',
      path:'/pages/index/index',
      imageUrl:'https://6d63-mc-dc4b7e-1258736979.tcb.qcloud.la/566.png?sign=87f684c4ac646ed2653f170d21341ea3&t=1552904828',
      success(e){
        wx.showShareMenu({
          withShareTicket:true
        })
      }
    }
 },
 jump_index(){
  wx.switchTab({
    url: '/pages/index/index'
  })
 },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.pid);
    var pid = options.pid
    var db = wx.cloud.database();
    db.collection('foods_info').where({
      pid:pid
    }).get({
      success: (res) => {
        // console.log(res.data[0]);
        this.setData({
          swiper: res.data[0].swiper.split(','),
          main: res.data[0].main.split(','),
          title: res.data[0].title,
          price:res.data[0].price,
          cart_img:res.data[0].cart,
          pid:res.data[0]._id
        })
        console.log(this.data.pid);
      }
    })
  },
  addCart() {
    var db = wx.cloud.database();
    //先去查询总表获取
    db.collection('cart_list').where({
      pid: this.data.pid
    }).get({
      success: (res) => {
        if (res.data.length == 0) {
          db.collection('cart_list').add({
            data: {
              price: this.data.price,
              title: this.data.title,
              cart_img: this.data.cart_img,
              count: this.data.count,
              pid: this.data.pid,
              type:'circle'
            },
            success: (res) => {
              console.log("新建表插入成功" + res._id);
              wx.showToast({
                title: '添加成功',
                duration: 1500
              })
            }
          })
        } else{
          var id = res.data[0]._id;
          var nowCount = res.data[0].count          
          db.collection('cart_list').doc(id).update({
            data: {
              count: parseInt(nowCount)+1
            },
            success: res => {
              wx.showToast({
                title: '添加成功',
                duration:1500
              })
            },
            fail: res => {
              console.log(res);
            }
          })
        }
      }
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