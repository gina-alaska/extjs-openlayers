/**
 * Class: OpenLayers.Format.PrecisionWKT
 * Class for reading and writing Well-Known Text.  Create a new instance
 * with the <OpenLayers.Format.PrecisionWKT> constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Format>
 */
OpenLayers.Format.PrecisionWKT = OpenLayers.Class(OpenLayers.Format.WKT, {
  initialize: function(options) {
    this.extract.point = function(point) {
      return point.x.toFixed(this.precision) + ' ' + point.y.toFixed(this.precision);
    };
    OpenLayers.Format.WKT.prototype.initialize.apply(this, [options]);
  },

  precision: 14
});