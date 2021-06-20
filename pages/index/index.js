// index.js
// 获取应用实例，拿到外部全局app.js的数据，通过app.来调用
const app = getApp();

Page({
  data:{
    options: [{
      city_id: '001',
      city_name: '北京'
    }, {
      city_id: '002',
      city_name: '上海'
    }, {
      city_id: '003',
      city_name: '深圳'
    }],
    selected: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../publish/publish'
    })
  },
  onShow(){
    //获取当前位置

  },
  onReady(){
    this.mapCtx=wx.createMapContext('mymap')//创建 map 上下文 MapContext 对象
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  onShareAppMessage(){//设置分享转发页面
    return {
      title:'二手交易',
      path:'/pages/index/index'

    }

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  change (e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  }
  
})
