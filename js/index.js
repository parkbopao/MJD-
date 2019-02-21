window.addEventListener('load', ()=>{
    carousel();
    changeHeaderOpacity();
    skillTime()
});
let timer = null ;
window.addEventListener('resize',()=>{
    clearInterval(timer);
    timer = setTimeout(()=>{
        window.location.reload()
    },200)
});
function carousel() {
    let imgBanner = document.getElementsByClassName('JD-banner')[0];
    let imgUlBox = imgBanner.getElementsByTagName('ul')[0];
/*    let olLis = imgBanner.getElementsByTagName('ol')[0].children;*/
    let olBox = imgBanner.getElementsByTagName('ol')[0];
    let olLis = olBox.getElementsByTagName('li');
    let ulWidth = imgBanner.offsetWidth / 10;
/*    console.log(ulWidth)*/
    let addTransition = () => {
        imgUlBox.style.transition = 'all .2s ease';
        imgUlBox.style.webkitTransition = 'all .2s ease'
    };
    let removeTransition = () => {
        imgUlBox.style.transition = 'none';
        imgUlBox.style.webkitTransition = 'none'
    };
    let translateX = (x) => {
        imgUlBox.style.transform = `translateX(${x}rem)`;
        imgUlBox.style.webkitTransform = `translateX(${x}rem)`
    };
    let timer = null;
    let index = 1;
   /*  timer = setInterval(function () {
        index ++ ;
        if(index >= 9){
            index = 1
        }else if(index <=0){
            index = 8
        }
        addTransition();
        translateX(-index * ulWidth)
    },1000)
    */
   let autoPlay = ()=>{
       index ++ ;
       addTransition();
       translateX(-index * ulWidth)
   };
   timer = setInterval(autoPlay,1000);
  /* imgUlBox.addEventListener('transitionEnd',()=>{
       if(index >= 9){
           index = 1
       }else if(index <= 0){
           index = 8
       }
       removeTransition();
       translateX(-index * ulWidth);
       changePoint()
   });
    imgUlBox.addEventListener('webkitTransitionEnd',()=>{
        if(index >= 9){
            index = 1
        }else if(index <= 0){
            index = 8
        }
        removeTransition();
        translateX(-index * ulWidth);
        changePoint()
    });*/
   Mjd.transitionFun(imgUlBox,()=>{
       if(index >= 9){
           index = 1
       }else if(index <= 0){
           index = 8
       }
       removeTransition();
       translateX(-index * ulWidth);
       changePoint()
   });
    function changePoint() {
        for (let i=0;i<olLis.length;i++){
            olLis[i].className = ''
        }
        let indicatorIndex = index ;
        if(indicatorIndex >= 9){
            index = 0
        }else if(index <= 0){
            index = 7
        }
        olLis[indicatorIndex - 1].className = 'current'
    }
   /*监听手势滑动*/
    let startX = 0; // 起始触摸
    let endX = 0; // 结束触摸
    let distanceX = 0; // 滑动的距离

    imgUlBox.addEventListener('touchstart',(e)=>{
       console.log(e.touches);
       clearInterval(timer);
       startX = e.touches[0].clientX ;
    });
    imgUlBox.addEventListener('touchmove',(e)=>{
        endX = e.touches[0].clientX;
        distanceX = (startX - endX )/10 ;
        translateX(-index * ulWidth - distanceX)
    });
    imgUlBox.addEventListener('touchend',(e)=>{
        if(Math.abs(distanceX)> 1/3 * ulWidth && endX !== 0 ){
            if(distanceX>0){
                index ++
            }else if(distanceX<0){
                index --;
            }
        }
         addTransition();
         translateX(-index * ulWidth);
         timer = setInterval(autoPlay,1000);
         startX = 0;
         endX = 0;
         distanceX = 0;
    })
}
function changeHeaderOpacity() {
    let scrollT = 0;
    let headerBox = document.getElementsByClassName('JD-header-box')[0];
    let bannerBox = document.getElementsByClassName('JD-banner')[0];
    let bannerH =   bannerBox.offsetHeight;
    let opacityV = 0;
    window.addEventListener('scroll',()=>{
           scrollT = document.documentElement.scrollTop;
           opacityV = scrollT/bannerH > 0.8 ?  0.8 :  (scrollT/bannerH).toFixed(2);
        /*console.log(opacityV);*/
           headerBox.style.backgroundColor = `rgba(236, 45, 45, ${opacityV})`
    })
}
function skillTime(){
    let skillTimer = null;
    let timeSpan = document.getElementsByClassName('kill-time')[0];
    /*console.log(timeSpan);*/
    let spans= timeSpan.getElementsByTagName('span');
 /*   console.log(spans);*/
    let skillT = 24;
    let skillTimeM = skillT * 60 * 60 ;
    skillTimer = setInterval(()=>{
        skillTimeM -- ;
        if(  skillTimeM <= 0){
            clearInterval(skillTimer);
        }
        let h = Math.floor( skillTimeM / (60*60));
        let m = Math.floor(skillTimeM/60 % 60);
        let s = skillTimeM % 60;
      /*  console.log(h,m,s)*/
          spans[0].innerHTML = h > 10 ? Math.floor(h/10) : 0 ;
          spans[1].innerHTML = h % 10 ;
          spans[3].innerHTML = m > 10 ? Math.floor(m/10) : 0 ;
          spans[4].innerHTML = m % 10 ;
          spans[6].innerHTML = s > 10 ? Math.floor(s/10) : 0 ;
          spans[7].innerHTML = s % 10 ;
    },1000)
}