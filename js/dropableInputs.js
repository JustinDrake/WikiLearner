CT.dropableInputs = function ($theInputs) {
	$theInputs.each(function () {
		var $this = this;

		this.droppable({
			accept: '.answerbutton',
			tolerance: 'pointer',
			drop: function (event, ui) {
				if (ui.draggable.hasClass('special')) {
					$this.val($this.data('$link').text());
				}

				if(CT.marking($this) === false) {
					ui.draggable.animate({backgroundColor: colors.flashRed}, 300);
				}

			},
			over: function (event, ui) {
				$this
					.val(ui.draggable.text())
					.correctWidth();

				ui.helper.css('z-index', -1);
			},
			out: function (event, ui) {
				$this
					.val('')
					.innerWidth(inputSettings.minimumWidth);

				ui.helper.css('z-index', 0);
			}
		});
	});
}