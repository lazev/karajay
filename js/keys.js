const Keys = {

	pressed: {},

	map: {
		left:    'a',
		right:   'd',
		up:      'w',
		down:    's',
		jump:    ' ',
		attack1: 'j',
		attack2: 'k',
		dash:    'Shift',
		pause:   'p'
	},

	monitor: () => {

		window.addEventListener('keydown', function(ev){
			//console.log(ev.key);
			Keys.pressed[ev.key] = true;
		});

		window.addEventListener('keyup', function(ev){
			Keys.pressed[ev.key] = false;
		});

	}

};
