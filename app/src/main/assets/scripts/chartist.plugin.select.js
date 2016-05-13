/**
 * Chartist.js plugin to select elements.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
	'use strict';

	var defaultOptions = {
		action: Chartist.noop
	};

	Chartist.plugins = Chartist.plugins || {};
	Chartist.plugins.select = function (options) {

		options = Chartist.extend({}, defaultOptions, options);

		return function (chart) {

			chart.on('draw', function (data) {
				options.action(data);
			});
		};
	};

}(window, document, Chartist));
