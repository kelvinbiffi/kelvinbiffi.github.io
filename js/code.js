/**
 * Move the background header
 */
(function (time) {
  var move = 0;
  var func = true;
  var setMargin = setInterval(function () {
    var bgPosi = move + 'px 50%';
    document.querySelector('.header').style.backgroundPosition = bgPosi;
    if (move === window.innerWidth) {
      func = false;
    } else if(move === 1) {
      func = true;
    }
    move += (func ? 1 : -1);
  }, time);
})(50);

/**
 * Add the event listener to set the sticky header
 */
window.addEventListener('scroll', function (i) {
  if (document.body.scrollTop > 240) {
    document.body.classList.add('stick');
  } else {
    document.body.classList.remove('stick');
  }
});

/**
 * Module to Controle the Site Language
 */
var languageControl = (function () {
  var DOMItems = {
    englishBtn: '.language_en_btn',
    portugueseBtn: '.language_pt_btn',
    englishId: 'en',
    portugueseId: 'pt'
  };

  var showLanguage = function (languageId) {
    var nodes;

    // Manage language nodes
    nodes = document.querySelectorAll('.' + DOMItems.portugueseId)
    nodes = Array.prototype.slice.call(nodes);
    nodes.forEach(function(curr){
      curr.classList.add('disabled');
    });

    nodes = document.querySelectorAll('.' + DOMItems.englishId)
    nodes = Array.prototype.slice.call(nodes);
    nodes.forEach(function(curr){
      curr.classList.add('disabled');
    });

    nodes = document.querySelectorAll('.' + languageId)
    nodes = Array.prototype.slice.call(nodes);
    nodes.forEach(function(curr){
      curr.classList.remove('disabled');
    });

    // Manage Language buttons
    document.querySelector(DOMItems.englishBtn).classList.remove('active');
    document.querySelector(DOMItems.portugueseBtn).classList.remove('active');
    document.querySelector('.language_' + languageId + '_btn').classList.add('active');
  };

  var initializeModule = function () {
    document.querySelector(DOMItems.portugueseBtn).addEventListener('click', function () {
      showLanguage(DOMItems.portugueseId);
    });
    document.querySelector(DOMItems.englishBtn).addEventListener('click', function () {
      showLanguage(DOMItems.englishId);
    });

    //Start with English Language
    showLanguage(DOMItems.portugueseId);
  };

  return {
    initModule: initializeModule
  };
})();

// Init language module
languageControl.initModule();
