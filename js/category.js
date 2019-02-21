window.addEventListener('load',function () {
   let cateNavBox = document.getElementsByClassName('category-main-left')[0];
   let cateNav = cateNavBox.getElementsByClassName('category-main-left-con')[0];
   let cateLis = cateNav.children ;
   let navBoxH = cateNavBox.offsetHeight;
   let navUlHeight = cateNav.offsetHeight;
   function addTransition() {
       cateNav.style.transition = 'all .2s ease';
       cateNav.style.webkitTransition = 'all .2s ease'
   }
   function removeTransition() {
       cateNav.style.transition = '';
       cateNav.style.webkitTransition = ''
   }
   function startTransformY(y) {
       cateNav.style.transform = `translateY(${y}rem)`;
       cateNav.style.webkitTransform = `translateY(${y}rem)`
   }
   let bufferY = 15;
   let startY = 0,endY = 0,moveY = 0;
   let currentY = 0;
    cateNavBox.addEventListener('touchstart',(e)=>{
        startY = e.touches[0].clientY/10;
    });
    let maxY = 0,minY = -(navUlHeight - navBoxH)/10 ;
    cateNavBox.addEventListener('touchmove',(e)=>{
        endY = e.touches[0].clientY/10;
        moveY = startY - endY ;
        currentY = currentY - moveY ;
        if(currentY< maxY + bufferY && currentY >= minY - bufferY){
            removeTransition();
            startTransformY(currentY)
        }
    });
    cateNavBox.addEventListener('touchend',(e)=>{
        if(currentY > 0){
            currentY = maxY;
            addTransition();
            startTransformY(currentY)

        }else if(currentY < minY){
            currentY = minY;
            addTransition();
            startTransformY(currentY)
        }else {
            currentY = currentY - moveY ;
        }
        startY = 0;
        endY = 0;
        moveY = 0
    });
     Mjd.tap(cateNav,(e)=>{
         let targetA = e.target;
       /*  console.log(li);*/
         let targetLi = targetA.parentNode;
         for(let i=0;i<cateLis.length;i++){
             cateLis[i].className = '';
             cateLis[i].index = i;
         }
         targetLi.className = 'current';
         let tapMoveY = -(4.4 * targetLi.index);
         /*  console.log(targetLi.index);
         console.log(tapMoveY);*/
          if(tapMoveY < minY){
              startTransformY(minY);
              currentY = minY
          }else {
              addTransition();
              startTransformY(tapMoveY);
              currentY = tapMoveY
          }
          let categoryRight = document.getElementsByClassName('category-main-right')[0];
          categoryRight.style.opacity = 0;
          categoryRight.style.transition = 'all .3s ease';
          categoryRight.style.webkitTransition = 'all .3s ease';
          setTimeout(()=>{
              categoryRight.style.opacity = 1
          },300)

     });

});