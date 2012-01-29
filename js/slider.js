CT.createSlider = function (sections) {
	var $slider = $('<span>')
			.addClass('slider-frame noforeground'),
		$sliderButton = $('<span>')
			.addClass('slider-button')
			.html('quiz')
			.appendTo($slider)
			.freeze();

	return {
		insert: function () {
			$('h1').append($slider);
			$('.slider-frame').toggle(
				function () {
					$('.slider-button').addClass('on').html('read');
					$.each(sections, function (i, paragraph) {
						paragraph.readMode();
						CT.activatedSection.hideButtons();
					});
				},
				function () {
					$('.slider-button').removeClass('on').html('quiz');
					$.each(sections, function (i, paragraph) {
						paragraph.quizMode();
						CT.activatedSection.showButtons();
					});

					if (sections[0] !== undefined) {	// TODO: Focus first element of next paragraph if fail, etc.
						sections[0].focusFirstFreeInput();
					}
				}
			);
		}
	};
}