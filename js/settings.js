var CT = {},
	allParagraphs = [],
	colors = {
		blueBackground: 'rgb(246, 249, 251)',
		hoverBlue: 'rgb(226, 229, 231)',
		flashGreen: 'rgb(0, 255, 0)',
		correctGreen: 'rgb(144, 238, 144)',
		flashRed: 'rgb(255, 69, 0)',
		wrongRed: 'rgb(250, 128, 114)'
	},
	draggableSettings = {
		cancel: null,
		opacity: 0.7,
		distance: 5,
		helper: 'clone',
		revert: true,
		revertDuration: 200,
		start: function (event, ui) {
			ui.helper.data('potentialDraggable', false);
		}
	},
	scoringSettings = {
		correctAnswer: 20,
		wrongAnswer: -5,
		timeMalus: -2,
		highlightTime: 1000,
		width: 45,
		widthSmall: 25,
		rollerTime: 1000
	},
	gameSettings = {
		randomise: false,
		linksToShow: 3
	},
	inputSettings = {
		minimumWidth: 85
	},
	buttonSettings = {
		minimumWidth: 85,
		toggleSpeed: 500
	};