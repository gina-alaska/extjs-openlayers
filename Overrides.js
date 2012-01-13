/**
* Override for the default isValidZoomLevel function in OpenLayers.Map
* This will allow us to specify the min zoom that is valid for each map instance.
* 
* Tested with OpenLayers v2.11
**/
OpenLayers.Map.prototype.isValidZoomLevel = function(zoomLevel) {
  return ( (zoomLevel != null) &&
           (zoomLevel >= this.getMinZoomLevel()) &&
           (zoomLevel < this.getNumZoomLevels()) );
}

/**
* Get the minZoomLevel that is either specified on the map object or the currently
* active base layer
*
**/
OpenLayers.Map.prototype.getMinZoomLevel = function() {
  var minZoomLevel = this.minZoomLevel;
  
  if (this.baseLayer !== null && this.baseLayer.minZoomLevel >= 0) {
    minZoomLevel = this.baseLayer.minZoomLevel;
  }
  return (minZoomLevel >= 0 ? minZoomLevel : 0);
}