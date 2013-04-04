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
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms

	// Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
window.onload = function () {
	//body = document.getElementById('body'),


	document.body.appendChild( stats.domElement );
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
