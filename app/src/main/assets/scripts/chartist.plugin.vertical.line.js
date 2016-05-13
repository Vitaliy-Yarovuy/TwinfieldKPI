/**
 * Chartist.js plugin to insert vertical line in a line chart.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
	'use strict';

	var defaultOptions = {
		getPosition: Chartist.noop,
		getLabel: Chartist.noop,
		className: 'vertical-line'
	};

	var VerticalLine = function (chart, chartRect, options) {

		var labelClassName = options.className + '-label';
		var $label = $('.' + labelClassName);

		if (!$label.length) {
			$label = $('<span class="' + labelClassName + '" style="position: absolute"></span>')
				.appendTo(chart.container);
		}

		$label.hide();

		this.show = function (x) {

			$label
				.html(options.getLabel() || '')
				.css({ top: chart.options.chartPadding.top - $label.height(), left: x - $label.width() / 2 })
				.show();

			chart.svg.elem('line', {
				x1: x,
				x2: x,
				y1: chartRect.y1,
				y2: chartRect.y2
			}, options.className);
		};
	};

	Chartist.plugins = Chartist.plugins || {};
	Chartist.plugins.verticalLine = function (options) {

		options = Chartist.extend({}, defaultOptions, options);

		return function (chart) {

			if (!(chart instanceof Chartist.Line)) {
				return;
			}

			var position = {};

			chart.on('data', function () {
				position.index = chart.data.labels.indexOf(options.getPosition());
			});

			chart.on('draw', function (data) {
				if (position.index !== -1 && data.type === 'point' && data.index === position.index) {
					position.x = data.x;
				}
			});

			chart.on('created', function (data) {

				var verticalLine = new VerticalLine(chart, data.chartRect, options);

				if (position.index !== -1) {
					verticalLine.show(position.x);
				}
			});
		};
	};

}(window, document, Chartist));