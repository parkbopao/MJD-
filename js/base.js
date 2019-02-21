window.Mjd = {};
/*封装解决transitionEnd的兼容方法*/
Mjd.transitionFun = (obj,callback)=> {
    if(typeof obj !== 'object'){
        return
    }
    obj.addEventListener('transitionEnd',(e)=>{
        callback && callback(e)
    });
    obj.addEventListener('webkitTransitionEnd',(e)=>{
        callback && callback(e)
    })
};
/*封装tap移动端点击事件*/
Mjd.tap = (obj,callBack)=>{
     let currentTime = 0;
     let isMove = false;
    if(typeof obj !== 'object'){
        return
    }
    obj.addEventListener('touchstart',()=>{
           currentTime = Date.now() ;
    });
    obj.addEventListener('touchmove',()=>{
        isMove = true
    });
    obj.addEventListener('touchend',(e)=>{
        if(!isMove && Date.now()-currentTime<200){
            callBack && callBack(e)
        }
        //还原状态
        isMove = false;
        currentTime = 0;
    })
};