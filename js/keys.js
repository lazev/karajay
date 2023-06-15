const Keys = {

	pressed: {},

	map: {
		left:    'a',
		right:   'd',
		up:      'w',
		down:    's',
		jump:    ' ',
		attack1: 'j',
		dash:    'shift',
		pause:   'p',

	},

	monitor: () => {

		window.addEventListener('keydown', function(ev){
			Keys.pressed[ev.key] = true;
		});

		window.addEventListener('keyup', function(ev){
			Keys.pressed[ev.key] = false;
		});

	}

};