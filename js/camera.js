var Camera = {

	box: {
		pos: {
			x: 0,
			y: 0
		},
		size: {
			x: 200,
			y: 80
		}
	},


	shouldPanCameraToTheLeft: (canvas, camera) => {
		const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
		const scaledDownCanvasWidth = canvas.width / 4;

		if (cameraboxRightSide >= 576) return;

		if (
			cameraboxRightSide >=
			scaledDownCanvasWidth + Math.abs(camera.position.x)
		) {
			camera.position.x -= this.velocity.x;
		}
	},


	shouldPanCameraToTheRight: (canvas, camera) => {
		if (this.camerabox.position.x <= 0) return;

		if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
			camera.position.x -= this.velocity.x;
		}
	},


	shouldPanCameraDown: (canvas, camera) => {
		if (this.camerabox.position.y + this.velocity.y <= 0) return;

		if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
			camera.position.y -= this.velocity.y;
		}
	}

};