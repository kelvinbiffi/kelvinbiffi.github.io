/**
 * Module Paralax
 */
(function () {
  
  /**
   * Paralax Effect
   */
  function paralax() {
    var paralax = window.scrollY/3 - 150/3;
    document.querySelector('.on_lecture').style.backgroundPosition = 'center '+ paralax + 'px';
  }
  
  window.addEventListener('scroll', function(e) {
    paralax();
  });
  
  paralax();
})();

/**
 * Module Show More
 */
(function () {
  var cache = {
    sinopse: '.sinopse',
    mostrar: '.mostrar',
    esconder: '.esconder',
  };
  
  var sinopses = document.querySelectorAll(cache.sinopse);
  sinopses = Array.from(sinopses);
  sinopses.forEach((el) => {
    var mostrar = el.querySelector(cache.mostrar);
    var esconder = el.querySelector(cache.esconder);
    mostrar.addEventListener('mousedown', () => {
      el.classList.add('show');
    });
    esconder.addEventListener('mousedown', () => {
      el.classList.remove('show');
    });
  });

})();

(function () {
  var user = "";
  var maxItems = "16";
  var userName = "kelvinbiffi";
  var accessToken = "538452145.2028de1.7622a5b50498459c9bcdf350e40206db";
  var urlUserSearch = "https://api.instagram.com/v1/users/self/?access_token=" + accessToken;
  var images = [];
  var pagination = "";

  var fillImages = function(){
    var html = '';
    
    images.forEach(function (image) {
      html = '<div class="thumbex">' +
      '   <div class="thumbnail">' +
      '     <a href="' + image.link + '" target="_blank">' +
      '       <img src="' + image.images.standard_resolution.url + '"/>' +
      '     </a>' +
      '   </div>' +
      ' </div>';
      document.querySelector('#instagram').insertAdjacentHTML('beforeend', html);
    });
  };

  var handleReturn = function(data){
    for(var i in data.data){
      images.push(data.data[i]);
    }
    fillImages();
  };

  var getFeeds = function(){
    var urlFeedFind = "https://api.instagram.com/v1/users/" + user + "/media/recent?access_token=" + accessToken + "&count=" + maxItems;
    var request = new XMLHttpRequest();
    request.open('GET', urlFeedFind, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var resp = request.responseText;
        var data = JSON.parse(request.responseText);
        handleReturn(data);
      } else {
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send();
  };
  
  /**
   * Get User Info
   */
  var request = new XMLHttpRequest();
  request.open('GET', urlUserSearch, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var resp = request.responseText;
      var data = JSON.parse(request.responseText);
      user = data.data.id;
      getFeeds();
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
  
})();


