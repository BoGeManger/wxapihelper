//index.js
//获取应用实例
const app = getApp()
let wxapi = require('../../utils/wxapihelper.js');
Page({
  data: {

  },
  onLoad: function () {
    wxapi.pro.request({
      url: "http://localhost:3653/FlashShopping/GetFlashShoppingDevelopment_Log",
      method: 'get',
      data: {
        "session_Key": "30b4d30d-2228-4213-af7d-289992b11139",
        "MemberID": 20,
        "FlashShoppingID": 0,
      },
      isloading:true
      }).then((res)=>console.log('ok',res)).catch(()=>{console.log('nook')})
  },
})
