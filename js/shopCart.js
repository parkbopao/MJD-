window.addEventListener('load',()=>{
    let panelCon = document.getElementById('panel');
    let panelConBox = panelCon.getElementsByClassName('panel-content')[0];
    let panelBtnF = panelCon.getElementsByClassName('false')[0];
    let panelBtnT = panelCon.getElementsByClassName('true')[0];
    let trashCans = document.getElementsByClassName('product-cancel');
    let iconSelects = document.getElementsByClassName('icon-select');
    let rubbishTop;
    for(let i=0;i<trashCans.length;i++){
         let trashC = trashCans[i];
         Mjd.tap(trashC,()=>{
             rubbishTop = trashC.firstElementChild ;
             rubbishTop.style.transition = 'all .2s ease';
             rubbishTop.style.webkitTransition = 'all .2s ease';
             rubbishTop.style.transformOrigin = '0 0.5rem';
             rubbishTop.style.webkitTransformOrigin =  '0 0.5rem';
             rubbishTop.style.transform = 'rotate(-45deg)';
             rubbishTop.style.webkitTransform =  'rotate(-45deg)';
             panelCon.style.display = 'block';
             panelConBox.className = 'panel-content animate'
         })
    }
    Mjd.tap(panelBtnF,()=>{
        panelCon.style.display = 'none';
        rubbishTop.transform = 'rotate(0deg)';
        rubbishTop.style.webkitTransform =  'rotate(0deg)';
    });
   for (let i=0;i<iconSelects.length;i++){
      Mjd.tap(iconSelects[i],(e)=>{
          console.log(e.target,iconSelects[i]);
          if(e.target.hasAttribute('checked')){
              e.target.removeAttribute('checked')
          }else {
              e.target.setAttribute('checked','')
          }
      })
   }
});
