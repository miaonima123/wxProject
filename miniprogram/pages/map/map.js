Page({
  data: {
    markers: [{
      iconPath: 'https://6d63-mc-dc4b7e-1258736979.tcb.qcloud.la/map.png?sign=0652d8ac0bea9c21eb0a1b0f90b4cf42&t=1553179007',
      id: 0,
      latitude: 39.8252226880,
      longitude: 116.2970027003,
      width: 25,
      height: 25,
      title:'丰台科技园',
      callout:{
        content:'丰台小店',
        fontSize:"18",
        borderRadius: "10",
        bgColor: "#ffffff",
        padding: "10",
        display:'ALWAYS'
      }
    },
      {
        iconPath: 'https://6d63-mc-dc4b7e-1258736979.tcb.qcloud.la/map.png?sign=0652d8ac0bea9c21eb0a1b0f90b4cf42&t=1553179007',
        id: 2,
        latitude: 39.9769151539,
        longitude: 116.3941967438,
        width: 25,
        height: 25,
        title:"北土城",
        callout: {
          content: '北土城小店',
          fontSize: "18",
          borderRadius: "10",
          bgColor: "#ffffff",
          padding: "10",
          display: 'BYCLICK'
        }
      },
      {
        iconPath: 'https://6d63-mc-dc4b7e-1258736979.tcb.qcloud.la/map.png?sign=0652d8ac0bea9c21eb0a1b0f90b4cf42&t=1553179007',
        id: 3,
        latitude: 39.9624308129,
        longitude: 116.4913510177,
        width: 25,
        height: 25,
        title: "酒仙桥",
        callout: {
          content: '酒仙桥小店',
          fontSize: "18",
          borderRadius: "10",
          bgColor: "#ffffff",
          padding: "10",
          display: 'BYCLICK'
        }
      },
  
  ],
    controls: [{
      id: 1,
      iconPath: '',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    x: 39.9088596409,
    y: 116.3975157338
  },





  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
getWhere(){
    var that = this;
  wx.showModal({
    title: '授权',
    content: '是否同意小程序获取位置信息',
    success(res) {
      if (res.confirm) {
        wx.getLocation({
          type: 'wgs84',
          success:(res)=>{
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy
            console.log(latitude, longitude)
            that.setData({
              x: latitude,
              y: longitude
            })
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},

  onLoad: function (options) {
    this.getWhere()
  },
  










})