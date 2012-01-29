CT.scoring = function ($theLinks, $foldableBox, $buttonsBox) {
	var correctAnswers = 0,
		wrongAnswers = 0,
		totalScore = 0,
		maxCorrect = $theLinks.length,
		$correctAnswers = $('<span>')
			.addClass('correctanswers')
			.text('0')
			.freeze(),
		$wrongAnswers = $('<span>')
			.addClass('wronganswers')
			.text('0')
			.freeze(),
		$timer = $('<span>')
			.addClass('timer')
			.text('0:00')
			.freeze(),
		$score = $('<span>')
			.addClass('score')
			.text('0 %')
			.freeze(),
		$scoreBox = $('<div>')
			.addClass('scorebox')
			.prependTo($foldableBox)
			.append($correctAnswers, $wrongAnswers, '<br />', $timer, '<br />', $score),
		counter = (function () {
			var seconds = 0, ticking = false, timeMalus = 0;
			function clock() {
				if (ticking === true) {
					$timer.text((seconds - (seconds % 60)) / 60 + ':' + (((seconds % 60) < 10) ? ('0' + (seconds % 60)) : (seconds % 60)));

					if (timeMalus === 10) {
						timeMalus = 0;
						CT.activatedSection.scoring.timeMalus();
					}

					seconds += 1;
					timeMalus += 1;
					setTimeout(clock, 1000);
				}
			}

			return {
				startClock: function () {
					if (ticking === false) {
						ticking = true;
						clock();
					}
				},
				stopClock: function () {
					ticking = false;
				},
				resetMalus: function () {
					timeMalus = 0;
				},
				resetClock: function () {
					ticking = false;
					timeMalus = 0;
					seconds = 0;
				}
			};
		}());

	$('<span>').addClass('ui-icon ui-icon-check').insertAfter($correctAnswers);
	$('<span>').addClass('ui-icon ui-icon-close').insertAfter($wrongAnswers);
	$('<span>').addClass('ui-icon ui-icon-clock').insertAfter($timer);
	$('<span>').addClass('ui-icon ui-icon-clipboard').insertAfter($score);

	function scoreEffect(increments) {
		var i;
		var helperPlus = function (i) {
			setTimeout(function () {
				totalScore += 1;
				$score.text(Math.round(100 * totalScore / (scoringSettings.correctAnswer * maxCorrect)) + ' %');
			}, scoringSettings.rollerTime / increments * (i + 1));
		};

		var helperMinus = function (i) {
			setTimeout(function () {
				totalScore -= 1;
				$score.text(Math.round(100 * totalScore / (scoringSettings.correctAnswer * maxCorrect)) + ' %');
			}, -scoringSettings.rollerTime / increments * (i - 1));
		};

		if (increments > 0) {
			$score.stop(true, true).effect('highlight', {color: colors.correctGreen}, scoringSettings.highlightTime);
			for (i = 0; i < increments; i += 1) {
				helperPlus(i);
			}
		} else {
			$score.stop(true, true).effect('highlight', {color: colors.wrongRed}, scoringSettings.highlightTime);
			for (i = 0; i < -increments; i += 1) {
				helperMinus(i);
			}
		}
	}

	return {
		correctAnswer: function () {
			counter.startClock();
			correctAnswers += 1;
			scoreEffect(scoringSettings.correctAnswer);
			$correctAnswers
				.text(correctAnswers)
				.stop(true, true)
				.effect('highlight', {color: colors.correctGreen}, scoringSettings.highlightTime);

			// Reset the time malus counter
			counter.resetMalus();

			// Shut down the paragraph if completed
			if (correctAnswers === maxCorrect) {
				// Stop timer
				counter.stopClock();
				// Stars
				$buttonsBox.replaceWith(
					$('<span>')
						.addClass('ui-icon ui-icon-star')
				);
			}
		},
		wrongAnswer: function () {
			counter.startClock();
			wrongAnswers += 1;
			scoreEffect(scoringSettings.wrongAnswer);
			$wrongAnswers
				.text(wrongAnswers)
				.stop(true, true)
				.effect('highlight', {color: colors.wrongRed}, scoringSettings.highlightTime);
		},
		timeMalus: function () {
			totalScore += scoringSettings.timeMalus;
		},
		restart: function () {
			$($correctAnswers, $wrongAnswers).text('0');
			$timer.text('0:00');
			$score.text('0 %');
			counter.resetClock();
			correctAnswers = 0,
			wrongAnswers = 0,
			totalScore = 0
		}
	};
}