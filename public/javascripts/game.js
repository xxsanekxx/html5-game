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


GameEngineClass = Class.extend({
	gLoop: 0,
	init: function() {

	},

	setup: function() {},

	clear: function() {
		ctx.fillStyle = '#d0e7f9';
		ctx.clearRect(0, 0, Settings.width, Settings.height);
		// ctx.beginPath();
		// ctx.rect(0, 0, gSETTING.width,  gSETTING.height);
		// ctx.closePath();
		// ctx.fill();
	},
	start: function() {
		gGameEngine.frameLoop();
	},
	frameLoop: function() {
		gGameEngine.clear();
		gPlayer.draw();
		gGameEngine.gLoop = setTimeout(gGameEngine.frameLoop, Settings.CANVAS_LOOP_HZ);
	}

});
gGameEngine = new GameEngineClass();

PlayerEngineClass = Class.extend({
	player: {
		image: null,
		width: 65,
		height: 95,
		frames: 1,
		actualFrame: 0,
		pos: {
			x:0,
			y:0
		}
	},
	xEnd: false,
	yEnd: false,
	interval: 0,
	init: function () {
		this.player.image = new Image();
		this.player.image.src = "images/angel.png";
		this.player.pos.x = Math.floor(((Settings.width - this.player.width)/2));
		this.player.pos.y = Math.floor(((Settings.height - this.player.height)/2));
	},
	setup: function() {},
	setPosition: function (x, y) {
		
	},
	draw: function() {
		try {
			ctx.drawImage(gPlayer.player.image, 0, gPlayer.player.height * gPlayer.player.actualFrame, gPlayer.player.width, gPlayer.player.height, gPlayer.player.pos.x, gPlayer.player.pos.y, gPlayer.player.width, gPlayer.player.height);
		}
		catch (e) {
			//console.log("!ctx drawImage");

		};
		if( (Settings.width - gPlayer.player.pos.x) < gPlayer.player.width)	gPlayer.xEnd = true;
		else if (gPlayer.player.pos.x < 0) gPlayer.xEnd = false;
		if( (Settings.height - gPlayer.player.pos.y) < gPlayer.player.height) gPlayer.yEnd = true;
		else if (gPlayer.player.pos.y < 0) gPlayer.yEnd = false;
		if (gPlayer.xEnd) gPlayer.player.pos.x -= 1;
		else gPlayer.player.pos.x += 1;
		if (gPlayer.yEnd) gPlayer.player.pos.y -= 1;
		else gPlayer.player.pos.y += 1;
		if (gPlayer.interval == 4 ) {
			if (gPlayer.player.actualFrame == gPlayer.player.frames) {
				gPlayer.player.actualFrame = 0;
			}
			else {
				gPlayer.player.actualFrame++;
			}
			gPlayer.interval = 0;
		}
		gPlayer.interval++;
	}
});
gPlayer = new PlayerEngineClass();



InputEngineClass = Class.extend({
	init: function () {

	},
	setup: function() {
		c.addEventListener('mousemove', gInputEngine.onMouseMove);
		c.addEventListener('keydown', gInputEngine.onKeyDown);
		c.addEventListener('keyup', gInputEngine.onKeyUp);

	},
	onMouseMove: function(event) {

	},
	onKeyDown: function(event) {
		console.log();
	}


 });
gInputEngine = new InputEngineClass();

KEY = {
  'MOUSE1': -1,
  'MOUSE2': -3,
  'MWHEEL_UP': -4,
  'MWHEEL_DOWN': -5,

  'LEFT_ARROW': 37,
  'UP_ARROW': 38,
  'RIGHT_ARROW': 39,
  'DOWN_ARROW': 40
};