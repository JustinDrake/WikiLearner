CT.textSuggest = function ($paragraphs, $theLinks, $foldableBox) {
	var okFocusout = true,
		listOfLinks = [];

	function compareLinks(a, b) {
		if (a.toLowerCase() === b.toLowerCase()) {
			return 0;
		}
		return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
	}

	function possibleAnswer(answer) {
		var i;

		// Run through all remaining links to see if input text is a possible answer
		for (i = 0; i < listOfLinks.length; i += 1) {
			if (answer.toLowerCase() === listOfLinks[i].toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	$theLinks.each(function () {
		listOfLinks.push($(this).text().firstLetterCapital());
	});

	$paragraphs
		.delegate('.input', 'focusin', function () {
			var $this = $(this);

		/*	$('.foldablebox').hide()
			$foldableBox.show(1000);

			$('p').removeClass('noforeground');

			$this.parent().addClass('noforeground');*/

			if (!$this.data('textSuggestInitiated')) {
				$this.data('textSuggestInitiated', true).autocomplete({
					autoFocus: true,
				//	minLength: 0, // This clashes with the right arrow
				    source: function(request, displayResponse) { // Need to cache listOfLinks!
				        var matcher = new RegExp('\\b' + $.ui.autocomplete.escapeRegex(request.term), 'i'),
				        	results = $.grep(listOfLinks.killDuplicates().sort(compareLinks), function(item,index) {
				            	return matcher.test(item);
				        	});

				        displayResponse(results);
				    },
					delay: 0,
					open: function (event, ui) { okFocusout = false; },
					close: function (event) {
						if (possibleAnswer($this.val()) === true) {
							okFocusout = true;

							// Deal properly with the TAB button
							if (event.keyCode !== 9) {
								$this.blur().goToNext();
							} else {
								$this.focus();
							}
						}
					}
				});
			}
		})
		.delegate('.input', 'focusout', function () {
			var $this = $(this).correctWidth(),
				attempt = $this.val();

			if (okFocusout === true && possibleAnswer(attempt) === true) { // Please clean up, Justin
				if(CT.marking($this) === false) {
					$paragraphs.find(':draggable').each(function () {
						if($(this).text().toLowerCase() === attempt.toLowerCase()) {
							$(this)
								.animate({backgroundColor: colors.flashRed}, 300)
								.delay(1000)
								.animate({backgroundColor: colors.blueBackground}, 300);
						}
					});
				}
			}
		})
		.delegate('.input', 'keydown', function () {
			var $this = $(this);

			if (($this[0].selectionStart === 0 && event.keyCode === $.ui.keyCode.LEFT) || (event.shiftKey && event.keyCode === $.ui.keyCode.TAB)) {
				$this.goToPrevious();
				return false;
			}
			if (($this[0].selectionEnd === $this.val().length && event.keyCode === $.ui.keyCode.RIGHT) || (!event.shiftKey && event.keyCode === $.ui.keyCode.TAB)) {
				$this.goToNext();
				return false;
			}
		});

	return {
		updateAutosuggest: function (nameOfLink) {
			listOfLinks.splice(listOfLinks.indexOf(nameOfLink.firstLetterCapital()), 1);
		}
	};
};