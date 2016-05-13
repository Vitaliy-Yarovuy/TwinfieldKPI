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
    root['Chartist.plugins.ctBarLabels'] = factory();
  }
}(this, function () {

  /**
   * Chartist.js plugin to display a data label on top of the points in a line chart.
   *
   */
  /* global Chartist */
  (function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
      labelClass: 'ct-label',
      anchorTo: "bar",
      labelOffset: {
        x: 0,
        y: -36,
        dy: 13
      },
      textAnchor: 'middle',
      labelInterpolationFnc: Chartist.noop
    };


    function calculateLabelPositionAnchorToBar(data, options){
      var x = data.x1 + options.labelOffset.x,
         y = Math.min(data.y2, data.y1) + options.labelOffset.y;
      return {x: x, y: y};
    }

    function calculateLabelPosition(data, options){
      var x = data.x + options.labelOffset.x,
         y = data.y + options.labelOffset.y;
      if(data.element._node instanceof SVGTextElement){
        y -= options.labelOffset.dy;
      }
      return {x: x, y: y};
    }

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctBarLabels = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctBarLabels(chart) {
        if(chart instanceof Chartist.Bar) {
          chart.on('draw', function(data) {
            if (data.type !== options.anchorTo){
              return ;
            }

            if(data.type === "label" && data.axis.units.pos !== "x"){
              return ;
            }

            var position;
            if(data.type === "bar"){
              position = calculateLabelPositionAnchorToBar(data, options);
            } else {
              position = calculateLabelPosition(data, options);
            }

            var text = data.group.elem('text', {
              x: position.x,
              y: position.y,
              style: 'text-anchor: ' + options.textAnchor
            }, options.labelClass);

            var labValue = options.labelInterpolationFnc(data.value, data.meta, data).split("\n");
            labValue.forEach(function (line, index) {
              var tspanOpts = { x: position.x, dy: options.labelOffset.dy };
              text.elem('tspan', tspanOpts, "ct-label-line-" + index).text(line);
            });

          });
        }
      };
    };

  }(window, document, Chartist));
  return Chartist.plugins.ctBarLabels;

}));
