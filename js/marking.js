CT.marking = function ($input) {
	console.time('Marking time');
	var linkText = $input.data('linktext'),
		lowerCaseInput = $input.val().toLowerCase();

	function textAfter(input) {
		return $.trim(input.nextSibling.nodeValue);
	}

	function textBefore(input) {
		return $.trim(input.previousSibling.previousSibling.nodeValue);
	}

	function isCorrect() {
		if (lowerCaseInput === linkText.toLowerCase()) { return true; }

	/*	if (textAfter($input[0]) === ',' || textAfter($input[0]) === 'and')
			if(lowerCaseInput === $input.next().next().data('linktext')) {
				$input = $input.next().next();
				linkText = $input.data('linktext');
				return true;
			}*/

		return false;
	}

	if (isCorrect()) {
		CT.textSuggestAPI.updateAutosuggest(linkText); // This needs to be done before `.goToNext()`!

		$input
			.val(linkText) // Restore original capitalisation
			.stop(true, true)
			.animate({backgroundColor: colors.flashGreen}, 300)
			.animate({backgroundColor: colors.correctGreen}, 300)
			.dblclick(function () { window.open('http://en.wikipedia.org/wiki/' + linkText); })
			.droppable('option', 'disabled', true)
			.freezeInput()
			.css('opacity', 1)
			.unbind('focusin') // all this unbinding needs cleaning up
			.unbind('focusout')
			.unbind('blur')
			.goToNext();

		$input.data('$button')
			.effect('highlight', {color: colors.flashGreen}, 400)
			.fadeTo(500, 0.10)
			.data('deactivateHover', true)
		//	.draggable('destroy') // Causes error, need to investigate!
			.freeze();

		CT.activatedSection.scoring.correctAnswer();

		console.timeEnd('Marking time');
		return true;
	} else {
		$input
			.val('')
			.innerWidth(inputSettings.minimumWidth)
			.stop(true, true)
			.effect('highlight', {color: colors.flashRed}, 600);

	/*	$input.bind('blur', function () {	// This doesn't work with `.blur()` for some reason
			$(this)
				.val('')
				.innerWidth(inputSettings.minimumWidth)
				.unbind('blur');
        });*/

		CT.activatedSection.scoring.wrongAnswer();
	
		console.timeEnd('Marking time');
		return false;
	}
}