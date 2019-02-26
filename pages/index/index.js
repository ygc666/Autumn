//index.js
const LIMIT = 3;

Page({
  data: {
    isReachEnd:false,//没有更多提示
    isLoading:false,//加载提示
    offsetRange:0,//已经加载数据数量
    essayList:[]
  },
  onReady(options){
    let that = this;
    wx.showLoading({
      title:"加载中",
      mask:true
    })
    //应用查询对象
    let Essay = new wx.BaaS.ContentGroup(1551083406801635);
    console.log(Essay);

    Essay.limit(3).find().then(res=>{
      // success
      wx.hideLoading();
      console.log(res);
      that.setData({
        essayList:res.data.objects //数据
      })
    }, err => {
      // err
      console.log(res)
      wx.hideLoading();
    })

  },
  /**
   * 页面上拉触底事件处理函数
   */
  onReachBottom(){
    let that = this;
    console.log("bottom");

    //已获取全部数据
    if(that.data.isReachEnd){
      wx.showToast({
        title: '暂无数据'
      });
      return;
    }

    //计算已加载数据
    let offsetRange = that.data.offsetRange + LIMIT;
    that.setData({
      offsetRange:offsetRange,
      isLoading:true //正在加载
    })

    let Essay = new wx.BaaS.ContentGroup(1551083406801635);

    Essay.limit(LIMIT).offset(that.data.offsetRange).find().then(res=>{
      let objects = res.data.objects;

      if(objects.length == 0){
        that.setData({
          isReachEnd:true,//已获取全部数据
          isLoading:false//加载结束
        })
      }else{
        that.setData({
          essayList:that.data.essayList.concat(objects),//拼接数据
          isLoading:false //加载结束
        })
      }
    }, err => {
      // err
      console.log(err)
    })
  }
})
