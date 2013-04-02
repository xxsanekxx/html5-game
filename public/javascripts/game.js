window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                  };
    })();

window.onload = function () {
	//body = document.getElementById('body'),
	c = document.createElement('canvas');
	ctx = c.getContext('2d');

	c.width = Settings.width;
	c.height = Settings.height;
	document.body.appendChild(c);
	gGameEngine.start();
};

var Settings = {
	width: 400,
	height: 400,
	fullscreen: false,
	CANVAS_LOOP_HZ: 1000 / 50

};
