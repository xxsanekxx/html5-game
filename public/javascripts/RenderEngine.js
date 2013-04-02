RenderEngineClass = Class.extend({
	canvas: null,
	context: null,
	init: function () {
		console.log("Render Engine init!");
	},
	setup: function() {
		console.log("Render Engine setup!");
		//this.canvas = window.c;
		//this.context = this.canvas.getContext('2d');
		window.addEventListener('mousemove', gInputEngine.onMouseMove);
		window.addEventListener('keydown', this.keydown, false);
		window.addEventListener('keyup', this.keyup, false);
	},
	keydown: function(event) {
		if (event.target.type == 'text') {
			return;
		}
		gInputEngine.onKeyDown(event);
	},
	keyup: function(event) {
		if(event.target.type == 'text'){
			return;
		}
		gInputEngine.onKeyUp(event);
	},
	mousedown: function (event) {
    gInputEngine.onMouseDownEvent(event.button, gRenderEngine.lastMouse.x, gRenderEngine.lastMouse.y, event);
  },

  //-----------------------------------------
  mouseup: function (event) {
    gInputEngine.onMouseUpEvent(event.button, gRenderEngine.lastMouse.x, gRenderEngine.lastMouse.y, event);
  }

});
gRenderEngine = new RenderEngineClass();