Page({
  data:{
    coverurl:"123",
    user:{}

  },
  onLoad:function(options){
    let user=JSON.parse(options.user)
    
    this.setData({
      user:user
    })
    const uerfilename=user[6]
    
    const data=Object.assign({
      uerfilename:uerfilename
    },)
    //console.log(data)
    wx.request({
      url: 'http://localhost//text.php', //仅为示例，并非真实的接口地址
      data: data,
      method:"POST",//需大写
      responseType:'arraybuffer',
         header: {
          'content-type': 'application/x-www-form-urlencoded' // 将传输的对象转为string
         },
      success:this.handleSubmitSucc.bind(this)
    })
  },
  handleSubmitSucc(res){
    var that=this
   if(res.data){
     const listdata=res.data
     //console.log(res.data)
     let url=wx.arrayBufferToBase64(res.data)
     //console.log(url)
     that.setData({
       coverurl:url
     })
     
   }
    //console.log(that.data. coverurl)
 
 },
})