const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit:"编辑",
    hide:"none",
    checkType:"circle",
    totalStyle:"flex",
    cart_list:[],
    num:0,
    allSelected:"circle",
    total:0.00,
    checkboxStatus:false,
    pid:[],
    pindex:0
  },
  // 删除编辑
  changeDel(){
    if(this.data.edit==="编辑"){
      this.setData({
        edit:"完成",
        hide:"flex",
        totalStyle:"none"
      })
    }else{
      this.setData({
        edit:"编辑",
        hide:"none",
        totalStyle: "flex"
      })
    }
  },
  // 添加数量
  addCount(e){
    var i = e.currentTarget.dataset.index;
    var newList = this.data.cart_list
    var nowCount = this.data.cart_list[i].count;
    nowCount++;
    newList[i].count = nowCount 
    this.setData({
      cart_list:newList
    })
  },
  //减少数量
  cutCount(e){
    var i = e.currentTarget.dataset.index;
    var newList = this.data.cart_list
    var nowCount = this.data.cart_list[i].count;
    if(nowCount>1){
      nowCount--
    }else{
      nowCount=1
    }
    newList[i].count = nowCount 
    this.setData({
      cart_list: newList
    })
  },
  // 单选
  CheckIcon(e) {
    var i = e.target.dataset.index;
    var price = e.target.dataset.price;
    var count = e.target.dataset.count;
    console.log(count)
    var pid = e.target.dataset.pid
    var sum = Number(this.data.total);
    var newList = this.data.cart_list;
    if(newList[i].type=='circle'){
      newList[i].type='success'
      sum +=(count*price) 
      this.setData({
        cart_list:newList,
        total:sum.toFixed(2)
      })
    }else{
      newList[i].type='circle'
      sum-=(count * price) 
      if(sum<=0){
        sum=0
      }
      this.setData({
        cart_list: newList,
        total: sum.toFixed(2)
      })
    }
    console.log(newList[i])
    var arr = []
    // console.log(arr);
    for(var item of this.data.cart_list){
      if(item.type=="success"){
        arr.push(1);
        this.setData({
          pid,
          pindex:i
        })
        // console.log(this.data.pid)
        // console.log(arr);
        if(arr.length==this.data.cart_list.length){
          this.setData({
            allSelected: "success",
            checkboxStatus:true
          })
        }else{
          this.setData({
            allSelected: "circle",
            checkboxStatus:false
          })
        }
      }
    }
  },
  //全选
  allSelect(e){
    var sum = 0;
    var newList = this.data.cart_list
    if(this.data.allSelected=='circle'){
      for (var item of newList) {
        item.type = "success"
        sum+=(item.count*item.price)
      }
      this.setData({
        cart_list: newList,
        allSelected:'success',
        total:sum
      })
    }else{
      for (var item of newList) {
        item.type = "circle"
        sum -= (item.count * item.price)
      }
      if(sum<=0){
        sum=0
      }
      this.setData({
        cart_list: newList,
        allSelected: 'circle',
        total: sum
      })
    }
  },
  //删除里全选
  delStatus(){
    // console.log(this.data.checkboxStatus);
    var newCartList = this.data.cart_list 
    // console.log(newCartList)
      if(!this.data.checkboxStatus){
        this.setData({
          checkboxStatus: true
        })
        for (var item of newCartList){
          item.type = 'success'
        }
      } else{
        this.setData({
          checkboxStatus:false
        })
        for (var item of newCartList) {
          item.type = 'circle'
        }
      }
    this.setData({
      cart_list:newCartList
    })
  },
  //删除按钮
  allDel(){
    // console.log(this.data.pindex);
    var db = wx.cloud.database()
    var newCartList = this.data.cart_list
    db.collection("cart_list").doc(this.data.pid).remove({
      success: function (res) {
        wx.showToast({
          title: "删除成功",
          duration: 2000
        })
        // newCartList.splice(this.data.pindex,1);
        // this.setData({
        //   cart_list:newCartList
        // })
      },
      fail: function (res) {
        wx.showToast({
          title: "删除失败",
          duration: 2000
        })
      }
    })
    this.onLoad()
  },
  getCartList(){
    //页面加载获取购物车列表
    var db = wx.cloud.database()
    db.collection('cart_list').where({
      _openid: app.globalData.openid
    }).get({
      success: (res) => {
        // console.log(res.data);
        this.setData({
          cart_list: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCartList();
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCartList();
    
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