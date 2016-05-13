/**
 * Chartist.js plugin to add chart legend.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
	'use strict';

	var defaultOptions = {
		seriesCaptions: function () { return {}; },
		className: 'legend'
	};

	Chartist.plugins = Chartist.plugins || {};
	Chartist.plugins.legend = function (options) {

		options = Chartist.extend({}, defaultOptions, options);

		return function (chart) {

			var $legend = $('<div class="' + options.className + '" style="position: absolute"></div>').appendTo(chart.container);

			chart.on('created', function (data) {

				var captions = options.seriesCaptions();

				var html = Object.keys(captions).reduce(function (prev, key) {
					return prev + '<div class="series ' + key + '">' +
						'<svg class="series-label"><line x1="0" x2="100%" y1="50%" y2="50%" class="label-line"></line></svg>' +
						'<div class="value">' + captions[key] + '</div></div>';
				}, '');

				$legend
					.html(html)
					.css({
						left: data.chartRect.x1,
						top: data.chartRect.height() + chart.options.axisX.offset
					});
			});
		};
	};

}(window, document, Chartist));
