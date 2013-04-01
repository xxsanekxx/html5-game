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
