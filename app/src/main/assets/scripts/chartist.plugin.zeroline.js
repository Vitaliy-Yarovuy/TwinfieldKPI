(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.ctZeroLine'] = factory();
  }
}(this, function () {

  /**
   * Chartist.js plugin indicate zero level.
   *
   */
  /* global Chartist */
  (function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
      className: 'ct-zero-level',
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctZeroLine = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctZeroLine(chart) {
        if(chart instanceof Chartist.Bar) {
          chart.on('draw', function(data) {
            if(data.type !== "grid" || data.axis.units.pos !== "y"){
              return ;
            }
            var value = data.axis.ticks[data.index];
            if(value === 0){
              data.element.addClass(options.className);
            }
          });
        }
      };
    };

  }(window, document, Chartist));
  return Chartist.plugins.ctZeroLine;

}));
