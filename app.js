// app.js
//用来注册一个小程序
App({
  globalData:{

  },
  onLaunch() {
    try{
      const res=wx.getSystemInfoSync()
      this.globalData.windowHeight=res.windowHeight;
      this.globalData.windowWight=res.windowWidth;
      

    }catch(e){}

   
  },
  /*onShow(option){//生命周期函数--监听小程序显示，当小程序启动或从后台进入前台显示，会触发onShow
  console.log(option);option
  },
  onHide(){//生命周期函数--监听小程序隐藏，当小程序从前台切去后台会执行

  },
  onError(msg){//错误监听函数，当小程序发生脚本错误或者api调用失败时，会触发并带上错误信息
  console.log(msg);
  },
  */

})
