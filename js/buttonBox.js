// This is the box that contains all the answers
CT.createButtonsBox = function($paragraphs, $theLinks, $foldableBox) {
	var $buttonsBox = $('<div>').addClass('buttonsbox'),	// The actual `div` element, with class `buttonsbox`
		theButtons = [];	// The array that keeps track of the answer buttons

	function compareButtons(a, b) {
		if (a.text().toLowerCase() === b.text().toLowerCase()) {
			return 0;
		}
		return a.text().toLowerCase() < b.text().toLowerCase() ? -1 : 1;
	}

	function initialiseButton($link) {
		var	$button = $('<span>')
				.addClass('answerbutton')
				.data('potentialDraggable', true)
				.html($link.text().firstLetterCapital());

		theButtons.push($button);

		// Connect link and button
		$link.data('$button', $button);
		$button.data('$link', $link);

		// Connect input and button
		$button.data('$input', $link.data('$input'));
		$link.data('$input').data('$button', $button);
	}

	// Initialise buttons
	$theLinks.each(function () { initialiseButton($(this)); });

	// Sort and insert the buttons
	$(theButtons.sort(compareButtons)).each(function () {
		$(this).appendTo($buttonsBox);
//		$('<span>').addClass('ui-icon ui-icon-grip-diagonal-se').insertAfter($(this));
	});

	return $buttonsBox
		.delegate(':draggable', 'mouseover', function () {
			var $this = $(this);

			if($this.data('deactivateHover') !== true) {
				$this.stop(true, true);
			}

			$this
				.animate({backgroundColor: colors.hoverBlue}, 300);

			// Smart dragging delegation
			if (!$this.data('draggableInitiated')) {
				$this.data('draggableInitiated', true).draggable(draggableSettings);
			}

		})
		.delegate(':draggable', 'mouseout', function () {
			var $this = $(this);

			if($this.data('deactivateHover') !== true) {
				$this.stop(true, true);
			}

			$(this)
				.animate({backgroundColor: colors.blueBackground}, 300);
		})
		.delegate(':draggable', 'click', function () {
			var $this = $(this);

			$paragraphs
				.find(':focus')
				.val(function () {
					if (!$this.hasClass('special')) {
						return $this.text();
					} else {
						return $this.data('linktext');
					}
				})
				.correctWidth()
				.focusout();
		})
		.appendTo($foldableBox);
}