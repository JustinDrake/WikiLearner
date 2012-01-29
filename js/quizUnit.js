$(function () {
	'use strict';
	console.time('Whole article');

	CT.quizUnit = function ($paragraphs) {
		console.time('quizUnit');

		// Hiding and caching the list of links
		var $theLinks = $paragraphs.find("a[linktext]").hide();

		// Inserting and caching the list of input boxes
		var $theInputs = (function () {
			var theInputs = [];

			$theLinks.each(function () {
				var $this = $(this),
					$input = $('<input/>')
						.data('linktext', $this.text())
						.addClass('input')
						.innerWidth(inputSettings.minimumWidth)
						.insertAfter($this);

				// Update theInputs
				theInputs.push($input);

				// Conect link and input
				$input.data('$link', $this);
				$this.data('$input', $input);
			});

			return $(theInputs);
		}());

		// Inserting and caching the foldable box
		var $foldableBox = (function () {
			return $('<div>')
				.addClass('foldablebox')
				.appendTo($paragraphs.last())
				.hide();
		}());

		// This is the box that contains all the answers
		var $buttonsBox = CT.createButtonsBox($paragraphs, $theLinks, $foldableBox);

		var API = {
			readMode: function () {
				$theInputs.each(function () { $(this).hide(); });
				$theLinks.show();
			},
			quizMode: function () {
				$theInputs.each(function () { $(this).show(); });
				$theLinks.hide();
			},
			focusFirstFreeInput: function () {
				$theInputs.eq(0).focusin().focus();
			},
			size: $theLinks.length,
			showButtons: function () {
				$foldableBox.stop(true, true).show(buttonSettings.toggleSpeed);
				return this;
			},
			hideButtons: function () {
				$foldableBox.stop(true, true).hide(buttonSettings.toggleSpeed);
				return this;
			},
			addForeground: function () {
				$paragraphs
					.removeClass('noforeground')
					.css('background-color', 'white');

			},
			restart: function () {
				// Reinitialise the inputs
				$theInputs = $paragraphs.find('.input');

				// TODO: Reinitialise the buttons


				// Clean the work already done (didn't unbind the doubleclick, idea: always bind it?)
				$theInputs
					.val('')
					.css('background-color', colors.blueBackground)
					.innerWidth(inputSettings.minimumWidth)
					.unfreezeInput();

				$buttonsBox.find('.answerbutton')
					.fadeTo(500, 1)
					.data('deactivateHover', false);

				this.focusFirstFreeInput();
				this.scoring.restart();
			},
			scoring: CT.scoring($theLinks, $foldableBox, $buttonsBox) /** API: correctAnswer, wrongAnswer, timeMalus **/
		}

		/** API: updateAutosuggest **/
		CT.textSuggestAPI = CT.textSuggest($paragraphs, $theLinks, $foldableBox);

		// Make the inputs droppable
		CT.dropableInputs($theInputs);

		// Deal with keyboard
		CT.keyboard($theLinks, $paragraphs, $foldableBox);
		
		// Deal with the switching of quiz sections
		$paragraphs.delegate('.input', 'focusin', function () {
			if (CT.activatedSection !== API) {

				if (CT.activatedSection !== undefined) {
					CT.activatedSection
						.hideButtons()
						.addForeground();
				}

				CT.activatedSection = API.showButtons();
				$paragraphs
					.addClass('noforeground')
					.css('background-color', 'orange')
					.animate({backgroundColor: colors.hoverBlue}, 500);
			}
		});

		$paragraphs.delegate('.')

		console.timeEnd('quizUnit');
		
		return API;
	};
});