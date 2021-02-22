// index.js
// 获取应用实例，拿到外部全局app.js的数据，通过app.来调用
const app = getApp();

Page({
  data:{
    longitude:"",
    latitude:"",
    //设置地图控件，不随地图移动而移动
    controls:[{
      id:1,
      iconPath:"/resources/3.png",
      position:{
        left:(app.globalData.windowWight/2)-11,
        top:((app.globalData.windowHeight-40)/2)-31,
        height:31,
        width:22,

      }
    },
    {
      id:2,
      iconPath:"/resources/2.png",
      position:{
        left:20,
        top:app.globalData.windowHeight-90,
        height:30,
        width:30,

      },
      clickable:true//可以点击
    }
  ]
  },
  controltap(e){
    this.mapCtx.moveToLocation()
  },
  onShow(){
    //获取当前位置
    this.getLocation();
  },
  onReady(){
    this.mapCtx=wx.createMapContext('mymap')//创建 map 上下文 MapContext 对象
  },
  getLocation(){
    wx.getLocation({
      type:'gcj02',
      success:this.handleGetLocationSucc.bind(this)
    })

  },
  handleGetLocationSucc(res){
    this.setData({
      longitude:res.longitude,
      latitude:res.latitude
    })

  },

  onShareAppMessage(){//设置分享转发页面
    return {
      title:'萌宠交易',
      path:'/pages/index/index'

    }

  },
  
})
