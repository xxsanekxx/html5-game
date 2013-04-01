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