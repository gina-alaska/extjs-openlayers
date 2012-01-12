/**
 * Basic Openlayers Panel
 * 
 * @author Will Fisher
 * 
 * This should not be modified in any significant way instead please extend into a new class 
 * when adding any significant features   
 **/
Ext.define('Ext.OpenLayers.Basic', {
  extend: 'Ext.panel.Panel',

  config: {
    map: null,
    layers: null,
    projection: 'EPSG:3338',
    defaultZoom: 2,
    defaultCenter: new OpenLayers.LonLat(-147.849, 64.856)
  },
  mapConfig: {},

  projections: {
  /*
  * Alaska centric polar projection
  */
  'EPSG:3572': {
      defaultLayers: ['TILE.EPSG:3572.BDL', 'TILE.EPSG:3572.OSM', 'TILE.EPSG:3572.OSM_OVERLAY'],
      maxExtent: new OpenLayers.Bounds(-6010000, -6010000, 6010000, 6010000),
      minZoomLevel: 2,
      maxResolution: (6010000 * 2.0 / 256.0),
      units: 'm',
      projection: "EPSG:3572",
      displayProjection: new OpenLayers.Projection("EPSG:4326")
    },
    /*
    * Alaskan Albers Equal Area
    */
    'EPSG:3338': {
      defaultLayers: ['TILE.EPSG:3338.BDL', 'TILE.EPSG:3338.OSM', 'TILE.EPSG:3338.OSM_OVERLAY'],
      maxExtent: new OpenLayers.Bounds(-3500000, -3500000, 3500000, 3500000),
      //restrictedExtent: new OpenLayers.Bounds(-3500000, 0, 3500000, 3000000),
      // numZoomLevels: 18,
      maxResolution: (3500000 * 2.0 / 256.0),
      minZoomLevel: 2,
      units: 'm',
      projection: "EPSG:3338",
      displayProjection: new OpenLayers.Projection("EPSG:4326")
    },
		/*
			TODO find the espg code for the google projections
		*/
    'google': {
      defaultLayers: ['TILE.EPSG:3857.BDL', 'TILE.EPSG:3857.OSM', 'TILE.EPSG:3857.TOPO', 'TILE.EPSG:3857.CHARTS', 'TILE.EPSG:3857.OSM_OVERLAY'],
      projection: "EPSG:900913",
      units: 'm',
      maxResolution: 156543.0339,
      maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
      displayProjection: new OpenLayers.Projection("EPSG:4326")
    }
  },

  constructor: function(config) {
    this.initConfig(config);
    this.callParent(arguments);
  },

  initComponent: function() {
    this.addEvents('ready');
    
    Ext.applyIf(this.mapConfig, this.projections[this.projection]);

    if(this.layers) { 
      this.mapConfig.defaultLayers = this.layers;
    }
    
    this.layers = new Ext.util.MixedCollection(true);
    this.layers.on('add', function(index, obj, key, opts) {
      this.getMap().addLayer(obj);
    }, this);
    this.layers.on('remove', function(obj, key) {
      this.getMap().removeLayer(obj);
    }, this);

    this.callParent(arguments);
    
    this.on('beforedestroy', this.cleanup, this);
    this.on('afterrender', this.initMap, this, { defer: 100, single: true });
  },

  initMap: function() {
    this.map = new OpenLayers.Map(this.body.dom, this.mapConfig);

    this.initLayers();

    var center = this.getDefaultCenter().clone();
    center.transform(this.map.displayProjection, this.map.getProjectionObject());
    this.map.setCenter(center, this.getDefaultZoom());
    
    this.map.addControl(new OpenLayers.Control.Attribution());

    Ext.defer(this.resizeMap, 100, this);
    this.fireEvent('ready', this, { defer: 100 });
		this.on('resize', this.resizeMap, this);
  },

  initLayers: function() {
    Gina.Layers.inject(this.getMap(), this.mapConfig.defaultLayers);
  },

  resizeMap: function() {
    var center = this.getMap().getCenter();
    this.getMap().updateSize();
    this.getMap().setCenter(center);
    this.getMap().baseLayer.redraw();
  },
  
  panToBounds: function(bounds) {
    this.getMap().panTo(bounds.getCenterLonLat());
  },
  
  fit: function(bounds, minZoom) {
    if(minZoom === undefined || minZoom === null) {
      minZoom = 15;
    }
    var zoom = this.getMap().getZoomForExtent(bounds);
    this.getMap().zoomTo(Math.min(zoom, minZoom));
    this.panToBounds(bounds);
  },

  cleanup: function() {
    delete this.map;
  }
});
