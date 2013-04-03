GameEngineClass = Class.extend({
	gLoop: 0,
	entities: [],
	gravity: 0,
	SCALE: 30,
	bodyDef: new BodyDef(),
	playerBody: null,
	init: function() {
		console.log("GameEngine Init!");

	},

	setup: function() {

	},

	clear: function() {
		ctx.fillStyle = '#d0e7f9';
		ctx.clearRect(0, 0, Settings.width, Settings.height);
		// ctx.beginPath();
		// ctx.rect(0, 0, gSETTING.width,  gSETTING.height);
		// ctx.closePath();
		// ctx.fill();
	},
	start: function() {
		gRenderEngine.setup();
		gInputEngine.bind(gInputEngine.KEY.UP_ARROW, 'jump');
	    gInputEngine.bind(gInputEngine.KEY.DOWN_ARROW, 'move_down');
	    gInputEngine.bind(gInputEngine.KEY.LEFT_ARROW, 'move_left');
	    gInputEngine.bind(gInputEngine.KEY.RIGHT_ARROW, 'move_right');		
		gPhysicsEngine.create();
		gGameEngine.createGround();
		gPlayer.setup();
		gGameEngine.debugDraw();
		gGameEngine.frameLoop();
	},
	frameLoop: function() {
		//gGameEngine.clear();
		//gPlayer.draw();
		gPlayer.update();

		gPhysicsEngine.update(true);
		gGameEngine.gLoop = requestAnimFrame(gGameEngine.frameLoop, Settings.CANVAS_LOOP_HZ);
	},
	debugDraw: function() {
		var debug = new DebugDraw();
		debug.SetSprite(ctx);
		debug.SetDrawScale(this.SCALE);
		debug.SetFillAlpha(0.3);
		debug.SetLineThickness(1.0);
		debug.SetFlags(DebugDraw.e_shapeBit | DebugDraw.e_jointBit);
		gPhysicsEngine.world.SetDebugDraw(debug);
	},
	createGround: function() {
		var entityDef = {
			id: "ground",
			x: c.width / 2 / this.SCALE,
			y: c.height / this.SCALE,
			type: "static",
			useBouncyFixture: false,
			halfWidth: (400/ this.SCALE) / 2,
			halfHeight: (10 / this.SCALE) /2
		};
		gPhysicsEngine.addBody(entityDef);
	}
});
gGameEngine = new GameEngineClass();