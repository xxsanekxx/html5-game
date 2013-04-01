PlayerEngineClass = EntityClass.extend({
	physBody: null,
    _killed: false,
	player: {
		image: null,
		stand: {
			width: 72,
			height: 121,
			pos: {
				x:0,
				y:0
			},
			frames: 1
		},
		jump: {
			0: {
				width: 72,
				height: 121,
				pos: {
					x:0,
					y:0
				}
			},
			1: {
				width: 72,
				height: 137,
				pos: {
					x:0,
					y:124
				}
			},
			2: {
				width: 68,
				height: 161,
				pos: {
					x:0,
					y:265
				}
			},
			3: {
				width: 71,
				height: 164,
				pos: {
					x:0,
					y:436
				}
			},
			frames: 4
		},
		walk: {
			0: {
				width: 72,
				height: 121,
				pos: {
					x:0,
					y:0
				}
			},
			1: {
				width: 72,
				height: 123,
				pos: {
					x:72,
					y:0
				}
			},
			2: {
				width: 81,
				height: 124,
				pos: {
					x:73,
					y:124
				}
			},
			frames: 3
		},
		jumpSpeed: 10,
		actualFrame: 0
	},
	xEnd: false,
	yEnd: false,
	interval: 0,
	init: function() {},
    setup: function (inputx, inputy, settings) {
	    //settings.hsize = {x:72, y:121};
	    //this.parent(inputx, inputy, settings);
	    this.weapons = [null, null, null];
	    //this.team = settings.team;
	    var entityDef = { 
	      id: "player",
	      x: this.player.stand.pos.x,
	      y: this.player.stand.pos.y,
	      halfHeight: this.player.stand.width / 2, //JJG: divide by 2 to let the player squeeze through narrow corridors
	      halfWidth: this.player.stand.height / 2,
	      damping: 0,
	      angle: 0,
	      //categories: ['player', settings.team == 0 ? 'team0' : 'team1'],
	      collidesWith: ['all'],
	      //mapobject','team0','team1','projectile','pickupobject'],
	      userData: {
	        "id": "player",
	        "ent": this
	      }
	    };
	    this.physBody = gPhysicsEngine.addBody(entityDef);

	},
	setPosition: function (x, y) {
		
	},
	draw: function() {
		try {
			//console.log(ctx.width);
			ctx.drawImage(gPlayer.player.image, 0, 0,  gPlayer.player.stand.width, gPlayer.player.stand.height, c.width / 2, c.height - gPlayer.player.stand.height, gPlayer.player.stand.width,  gPlayer.player.stand.height);
		}
		catch (e) {
			console.log("!ctx drawImage");

		};



		// if( (Settings.width - gPlayer.player.pos.x) < gPlayer.player.width)	gPlayer.xEnd = true;
		// else if (gPlayer.player.pos.x < 0) gPlayer.xEnd = false;
		// if( (Settings.height - gPlayer.player.pos.y) < gPlayer.player.height) gPlayer.yEnd = true;
		// else if (gPlayer.player.pos.y < 0) gPlayer.yEnd = false;
		// if (gPlayer.xEnd) gPlayer.player.pos.x -= 1;
		// else gPlayer.player.pos.x += 1;
		// if (gPlayer.yEnd) gPlayer.player.pos.y -= 1;
		// else gPlayer.player.pos.y += 1;
		// if (gPlayer.interval == 4 ) {
		// 	if (gPlayer.player.actualFrame == gPlayer.player.frames) {
		// 		gPlayer.player.actualFrame = 0;
		// 	}
		// 	else {
		// 		gPlayer.player.actualFrame++;
		// 	}
		// 	gPlayer.interval = 0;
		// }
		// gPlayer.interval++;
	}
});
gPlayer = new PlayerEngineClass();