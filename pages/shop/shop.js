Page({
  data:{
    coverurl:"123",
    listdata:{
    }

  },
 onShow(){
   
  wx.request({
    url: 'http://localhost//text3.php', //仅为示例，并非真实的接口地址
    data: {
      
    },
    method:"POST",//需大写
    //responseType:'arraybuffer',
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
    console.log(res.data)
    //let ab=wx.arrayBufferToBase64(res.data)
    //console.log(ab)
    that.setData({
      listdata:listdata
    })
    
  }
   console.log(that.data. listdata)

},
opendetail:function(e){
  var use=e.target.dataset.user
  let user=JSON.stringify(use)
  console.log(user)
  wx.navigateTo({
    url: '../detail/detail?user='+user,
  })

}
})
 