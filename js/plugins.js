(function ($) {
	'use strict';

	(function () {
		if (!jQuery) {
			console.error('jQuery is not loaded!');
			return;
		} else {
			console.group('ClozeTestDev');
			console.info('jQuery version: ' + jQuery.fn.jquery + '\njQuery UI version: ' + jQuery.ui.version);
		}
	}());

	String.prototype.firstLetterCapital = function () {
		return this.charAt(0).toUpperCase().concat(this.slice(1));
	};

	Array.prototype.killDuplicates = function () {
		var result = [],
			tempObject = {},
			i;

		for (i = 0; i < this.length; i += 1) {
			tempObject[this[i]] = 0;
		}

		for (i in tempObject) {
			if (tempObject.hasOwnProperty(i)) {
				result.push(i);
			}
		}

		return result;
	};

	$.fn.freezeInput = function () {
		return this.each(function () { // Do we really need `each` here?
			$(this)
				.attr('frozen', true) // Change this to `.data()`, also change `.goToNext()`
				.css({				// I probably don't need this. `.prop('disabled', true)` does the job
					'-moz-user-select': 'none',
					'-webkit-user-select': 'none',
					'user-select': 'none'
				})
				.prop('tabIndex', '-1')
				.prop('disabled', true);
		});
	};

	$.fn.unfreezeInput = function () {
		return this.each(function () { // Do we really need `each` here?
			$(this)
				.attr('frozen', false) // Change this to `.data()`, also change `.goToNext()`
				.css({				// I probably don't need this. `.prop('disabled', true)` does the job
					'-moz-user-select': '',
					'-webkit-user-select': '',
					'user-select': ''
				})
				.prop('tabIndex', '')
				.prop('disabled', false);
		});
	};

	$.fn.freeze = function () {
		return this.each(function () {
			$(this)
				.css({
					'-moz-user-select': 'none',
					'-webkit-user-select': 'none',
					'user-select': 'none'
				})
				.bind('click', function () { return; });
		});
	};

	$.fn.correctWidth = function () { // I might be applying this function too many times than necessary
		var $embeddedText = $('<span>')
			.html(this.val() + '**')
			.css('font-size', this.css('font-size'))
			.css('font-family', this.css('font-family'))
			.insertBefore(this.parent());

		this.innerWidth(Math.max($embeddedText.innerWidth(), this.innerWidth()));
		
		$embeddedText.remove();
		return this;
	};

	// Idea: abstract the CSS selector using `$.expr`
	$.fn.goToNext = function ($theLinks) {
		this.nextAll('input:not([frozen=true])').first().focus().select().length
			|| this.prevAll('input:not([frozen=true])').last().focus().select().length
			|| this.blur();
	};

	$.fn.goToPrevious = function ($theLinks) {
		this.prevAll('input:not([frozen=true])').first().focus().select().length
			|| this.nextAll('input:not([frozen=true])').last().focus().select().length
			|| this.blur();
	};

	$.expr[':'].draggable = function (object) {
		return $(object).data('potentialDraggable') === true;
	};

}(jQuery)); 