Page({
    data: {
        essayList:{},
        time:"",
        count:""
    },
    onLoad(options){
        let that = this;
        if(options.id){
            let Essay = new wx.BaaS.ContentGroup(1551083406801635);
            Essay.getContent(options.id).then(res => {
                // success
                //处理count time
                let str = res.data.content,strLen;
                str = str.replace(/<[^>]+>/g,"");
                strLen = str.replace(" ","").length;
                let time = new Date( res.data.created_at*1000 ).toLocaleDateString();
                console.log(time)
                console.log(res.data)
                that.setData({
                    essayList:res.data,
                    count:" 字数: "+strLen,
                    time:"时间: "+time
                })
              }, err => {
                // err
              })
        }else{
            //未获取到id 待处理
        }
    },
})