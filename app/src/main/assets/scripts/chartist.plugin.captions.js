/**
 * Chartist.js plugin to add separator line in a line chart.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
	'use strict';

	var defaultOptions = {
		axisYCaption: 'Axis Y',
		axisXCaption: 'Axis X',
		classNames: {
			axisY: 'axis-y-caption',
			axisX: 'axis-x-caption'
		}
	};

	Chartist.plugins = Chartist.plugins || {};
	Chartist.plugins.captions = function (options) {

		options = Chartist.extend({}, defaultOptions, options);

		return function (chart) {

			var $axisY = $('<div class="' + options.classNames.axisY + '" style="position: absolute"></div>');
			var $axisX = $('<div class="' + options.classNames.axisX + '" style="position: absolute"></div>');

			$(chart.container)
				.append($axisY)
				.append($axisX);

			chart.on('created', function (data) {

				$axisY.text(options.axisYCaption || '');
				$axisY.css({
					left: data.chartRect.x1 - Math.min($axisY.width() / 2, data.chartRect.x1),
					top: -$axisY.height(),
				});

				$axisX.text(options.axisXCaption || '');
				$axisX.css({
					right: 0,
					top: data.chartRect.height() + chart.options.axisX.offset
				});
			});
		};
	};

}(window, document, Chartist));
