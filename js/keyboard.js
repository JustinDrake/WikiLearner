CT.keyboard = function ($theLinks, $paragraphs, $foldableBox) {
	// Specify ctrl + click behaviour on paragraph
	$paragraphs.click(function (event) {
		if (event.metaKey && $theLinks.length !== 0) {
			$foldableBox.stop(true, true).toggle(buttonSettings.toggleSpeed);
		/*	$theInputs.each(function () {
				var $this = $(this);
				$this.toggle(function () {
					$this.css('opacity', '0.25');
				}, function () {
					$this.css('opacity', '1');
				});
			}); */
		}
	});

	(function () {
		$paragraphs.mouseover(function () {
			$paragraphs.css('border-color', colors.hoverBlue);
		});

		$paragraphs.mouseout(function () {
			$paragraphs.css('border-color', 'white');
		});
	}());
}