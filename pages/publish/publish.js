// logs.js
const app = getApp();
Page({
  data:{
    address:"要选择哦~",
    success:false,
    nickName:"请点击获取用户名",
    tempFilePaths:'',
    sourceType: ['camera', 'album']
  },
  staticData:{

  },
  handleUserChange(e){
  console.log(e.detail.value)
  },
  handleDetailChange(e){
    console.log(this.data.nickName)
    this.staticData.detail=e.detail.value;
  },
  handleContextChange(e){
   this.staticData.telephone=e.detail.value

  },
  handleMessageChange(e){
    this.staticData.message=e.detail.value

  },
  handlePriceChange(e){
    this.staticData.price=e.detail.value

  },
  handleSubmit(){//判断是否填写完基本信息
    if(this.data.nickName=="请点击获取用户名"){
      wx.showToast({//相当于弹窗
      title: '请点击获取用户名',
      icon:'loading',
      duration:1000
      })
    return
 }
      if(!this.staticData.detail){
        wx.showToast({//相当于弹窗
        title: '请填写物品名称',
        icon:'loading',
        duration:1000
        })
      return
   }
    if(!this.staticData.message){
      wx.showToast({//相当于弹窗
        title: '请填写说明信息',
        icon:'loading',
        duration:1000
      })
      return
    }
    if(!this.staticData.telephone){
      wx.showToast({//相当于弹窗
        title: '请填写联系方式',
        icon:'loading',
        duration:1000
      })
      return
    }
    if(!this.staticData.price){
      wx.showToast({//相当于弹窗
        title: '请填写出售价格',
        icon:'loading',
        duration:1000
      })
      return
    }
    
    const tempFilePaths = this.data.tempFilePaths
    var that=this
    wx.uploadFile({
      url: 'http://localhost//text1.php',
      filePath: tempFilePaths[0],
      name: 'file',
     
      success:function(res){
        //打印
        var dat=JSON.parse(res.data)
           Object.assign(
             that.staticData
           ,dat)
           const data=Object.assign({
            nickName:that.data.nickName
          },that.staticData)
            console.log(that.staticData)
        wx.request({
          url: 'http://localhost//text2.php', 
          data:data,
          method:"POST",//需大写
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 将传输的对象转为string
          },
          success:that.handleSubmitSucc.bind(this)
        })
      }
    })
    // wx.request({
    //   url: 'http://192.168.43.204/text2.php', //仅为示例，并非真实的接口地址
    //   //data:data,
    //   method:"POST",//需大写
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 将传输的对象转为string
    //   },
    //   success:this.handleSubmitSucc.bind(this)
    // })

  },
  handleSubmitSucc(res){
    if(res.data){
      console.log(res)
      console.log(res.data);
      this.setData({
        success:true
      })
    }

  },
  handleBackTap(){
    wx.navigateBack({//如果没有参数则是关闭当前页面
      
    })

  },
  handlegetUserInfodata(){
    var that=this;
    wx.getUserInfo({
 
      success:function(res){
        that.setData({
          nickName:res.userInfo.nickName,
        })
        console.log(that.data.nickName)
      }
    })
  },

  onLoad: function () {
    this.setHeader();//页面数据刚加载时调用setHeader();
    },
    buttonclick: function () {
      const that = this
      wx.showActionSheet({
        itemList: ['拍照', '相册'],
        itemColor: '',
        //成功时回调
        success: function (res) {
          if (!res.cancel) {
            /*
             res.tapIndex返回用户点击的按钮序号，从上到下的顺序，从0开始
             比如用户点击本例中的拍照就返回0，相册就返回1
             我们res.tapIndex的值传给chooseImage()
            */
            that.chooseImage(res.tapIndex)
          }
        },
        //失败时回调
        fail: function (res) {
          console.log('调用失败')
         },
        complete: function (res) { },
      })
    },
    
  /*
  判断storage是否缓存图片，如果是就将图片从storage取出并赋值给tempFilePaths
  否则就使用默认的图片
  */
  setHeader(){
    const tempFilePaths = this.data.tempFilePaths;
    if (tempFilePaths) {
      this.setData({
        tempFilePaths: tempFilePaths
      })
    } else {
      this.setData({
        tempFilePaths: '/resources/add.jpg'
      })
    }
  },
  
    chooseImage(tapIndex) {
      const checkeddata = true
      const that = this
      wx.chooseImage({
      //count表示一次可以选择多少照片
        count: 1,
        //sizeType所选的图片的尺寸，original原图，compressed压缩图
        sizeType: ['original', 'compressed'],
        //如果sourceType为camera则调用摄像头，为album时调用相册
        sourceType: [that.data.sourceType[tapIndex]],
        success(res) {
          
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          //将选择到的图片缓存到本地storage中
          // wx.setStorageSync('tempFilePaths', tempFilePaths)
          that.setData({
            tempFilePaths: tempFilePaths
          })
         wx.uploadFile({
          url: 'http://localhost//text1.php',
          filePath: tempFilePaths[0],
          name: 'file',
         
          success:function(res){
            //打印
            console.log(res.data)
          //  var dat=JSON.parse(res.data)
          //  Object.assign(
          //   that.staticData
          // ,dat)
          //  console.log(that.staticData)
          }
        })
          /*
      由于在我们选择图片后图片只是保存到storage中，所以我们需要调用一次   	        setHeader()方法来使页面上的头像更新
      */
          that.setHeader();
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },

})
