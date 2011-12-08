OpenLayers.Map.prototype.isValidZoomLevel = function(zoomLevel) {
  return ( (zoomLevel != null) &&
           (zoomLevel >= this.getMinZoomLevel()) &&
           (zoomLevel < this.getNumZoomLevels()) );
}

OpenLayers.Map.prototype.getMinZoomLevel = function() {
  var minZoomLevel = this.minZoomLevel;
  
  if (this.baseLayer !== null && this.baseLayer.minZoomLevel >= 0) {
    minZoomLevel = this.baseLayer.minZoomLevel;
  }
  return (minZoomLevel >= 0 ? minZoomLevel : 0);
}