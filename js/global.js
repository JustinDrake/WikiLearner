/*global jQuery, $, console, setTimeout*/
/*jslint devel: true, browser: true, vars: true, sloppy: true, maxerr: 50, indent: 4*/

$(function () {
	var numberOfBlanks = 0,
		$paragraphsToQuiz = $(),
		j = 0,
		sections = [];

	(function () {
		$('p').each(function () {
			var $this = $(this);

			if (numberOfBlanks > 5) {
				sections.push(CT.quizUnit($paragraphsToQuiz));
				numberOfBlanks = $this.find('a').length;
				$paragraphsToQuiz = $this;
			} else {
				$paragraphsToQuiz = $paragraphsToQuiz.add(this);
				numberOfBlanks += $this.find('a').length;
			}
		});

		if (sections[0] !== undefined) {
			sections[0].focusFirstFreeInput();

			CT.createSlider(sections).insert();

			/*restart: restart()*/
			var restart = (function() {
				var $restart = $('<span>')
						.addClass('restart-button ui-icon ui-icon-arrowreturnthick-1-w noforeground')
						.html('')
						.appendTo('h1')
						.click(function () {
							CT.activatedSection.restart();
						});

			}());

			// Avoid the references when tabbing (bit of a hack; could improve)
			$('sup').find("a").prop('tabindex', -1);
		}

		$('#content').css({marginRight: $('#toc').width()});
		$('#toc').css({position: 'fixed', right: 0, top: '20%'});
		$('#toc').delegate('a', 'click', function () {
			var $this = $(this);

			if(this.hash) {
				var $header = $($this.attr('href'));

				$('.foldablebox').hide();

				$('body, html').stop().animate(
					{
						scrollTop: $header.offset().top
					},
					1000,
					'easeOutExpo',
					function () { $header.parent().next().children('input').eq(0).focus(); }
				);

				return false;
			}
		});

		$('<span>')
			.addClass('ui-icon ui-icon-heart')
			.appendTo('html');
		// Having 'right' instead of 'left' makes the damn thing disappear!

	}());

	console.groupEnd('ClozeTestDev');
	console.timeEnd('Whole article');
});