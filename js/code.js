(function(time){
  var move = 0;
  var func = true;
  var setMargin = setInterval(function(){
    var bgPosi = move + 'px 50%';
    document.querySelector('.header').style.backgroundPosition = bgPosi;
    if(move === window.innerWidth){
      func = false;
    }else if(move === 1){
      func = true;
    }
    move += (func ? 1 : -1);
  }, time);
})(50);


window.addEventListener('scroll', function(i){
  if(document.body.scrollTop > 240){
    document.body.classList.add('stick');
  }else{
    document.body.classList.remove('stick');
  }
});
