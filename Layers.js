/**
 * Layers definitions for AKGMI
 * 
 * @author Will Fisher
 * 
 * Only works with openlayers 2.11 due to the use of the new Layers.XYZ class
 */
Ext.define('Ext.OpenLayers.Layers', {
  "map": null,

  layers: [],

  layer_configs: {
    bdl: {
      name: 'Best Data Layer',
      type: 'tiles',
      baseUrl: 'http://swmha.gina.alaska.edu/tilesrv/bdl/tile/',
      options: {
        wrapDateLine: true,
        isBaseLayer: true
      }
    },
    charts: {
      name: 'NOAA Charts',
      type: 'tiles',
      baseUrl: 'http://swmha.gina.alaska.edu/tilesrv/charts/tile/',
      options: {
        wrapDateLine: true,
        isBaseLayer: true
      }
    },
    topo: {
      name: 'Topographic DRG',
      type: 'tiles',
      baseUrl: 'http://swmha.gina.alaska.edu/tilesrv/drg/tile/',
      options: {
        wrapDateLine: true,
        isBaseLayer: true
      }
    },
    topo_3338: {
      name: 'Topographic DRG',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/tilesrv/drg_shaded_aa/tile/',
      options: {
        wrapDateLine: true,
        isBaseLayer: true
      }
    },
    shaded_relief: {
      name: 'Shaded Relief',
      type: 'tiles',
      baseUrl: 'http://swmha.gina.alaska.edu/tilesrv/shaded_relief_ned/tile/',
      options: {
        wrapDateLine: true,
        isBaseLayer: true
      }
    },
    landsat_pan: {
      name: 'Landsat Pan',
      type: 'tiles',
      baseUrl: 'http://swmha.gina.alaska.edu/tilesrv/landsat_pan/tile/',
      options: {
        wrapDateLine: true,
        isBaseLayer: true
      }
    },
    bdl_3338: {
      name: 'Best Data Layer',
      type: 'tiles',
      baseUrl: 'http://swmha.gina.alaska.edu/tilesrv/bdl_esri_test/tile/',
      // numZoomLevels: 16,
      options: {
        wrapDateLine: false,
        isBaseLayer: true
      }
    },
    bdl_3572: {
      name: 'Best Data Layer (EPSG:3572)',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/test/tilesrv/bdl_polar/tile/',
      options: {
        isBaseLayer: true
      }
    },
    bdl_wms_3572: {
      name: 'Best Data Layer (EPSG:3572)',
      type: 'wms',
      baseUrl: 'http://wms.alaskamapped.org/cgi-bin/bdl.cgi?',
      params: {
        layers: "bdl_low_full,bdl_low_overview,bdl_mid_res_overview,bdl_mid_res_full,bdl_high_res_full,bdl_high_res_overview",
        transparent: false
      },
      options: {
        wrapDateLine: false,
        isBaseLayer: true
      }
    },
    osm_base_3338: {
      name: 'Open Street Maps - Base',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/test/tilesrv/osm/tile/',
      options: {
        wrapDateLine: false,
        isBaseLayer: true,
        attribution: '(c) <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    },
    osm_google_overlay_3338: {
      name: 'Open Street Maps',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/test/tilesrv/osm-google-ol/tile/',
      options: {
        wrapDateLine: false,
        isBaseLayer: false,
        opacity: 0.75,
        attribution: '(c) <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    },
    osm_overlay_3338: {
      name: 'Open Street Maps',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/test/tilesrv/osm-ol/tile/',
      options: {
        wrapDateLine: false,
        isBaseLayer: false,
        attribution: '(c) <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    },
    land_ownership_3338: {
      name: 'Land Ownership',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/test/tilesrv/glo/tile/',
      options: {
        wrapDateLine: false,
        isBaseLayer: false,
        opacity: 0.5,
        visibility: false        
      }
    },
    hydro_3338: {
     name: 'Hydrography',
     type: 'tiles',
     baseUrl: 'http://tiles.proto.gina.alaska.edu/tilesrv/hydro_aa/tile/',
     options: {
       isBaseLayer: false,
       visibility: false
     }
    },
    
    bathy_3338: {
      name: 'Shaded Relief + Bathymetry',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/tiles/aea_gina_bathymetry_aa/tile/',
      options: {
        isBaseLayer: true,
        visibility: false
      }
    },
   
    osm_hydro_3338: {
      name: 'Hydrography',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/tilesrv/osm-water/tile/',
      options: {
       isBaseLayer: false,
       visibility: false
     }
    },
    townships_3338: {
      name: 'Townships',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/tilesrv/pls_aa/tile/',
      options: { 
        isBaseLayer: false, 
        visibility: false 
      }
    },
    quads_3338: {
      name: 'Quadrangles',
      type: 'tiles',
      baseUrl: 'http://tiles.proto.gina.alaska.edu/test/tilesrv/quad_aa/tile/',
      options: {
        wrapDateLine: false,
        isBaseLayer: false,
        // opacity: 0.75,
        visibility: false
      }
    }
  },

  getUrl: function(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var tileCount = (1<<z);

    //Wrap the X value
    var X = (x % tileCount);
    //Check for JS modulo operator possibly returning negative values
    if(X < 0) { X += tileCount; }

    var path = X + "/" + y + "/" + z;
    var url = this.url;
    if (url instanceof Array) {
        url = this.selectUrl(path, url);
    }
    return url + path;
  },

  imageMapType: function(name) {
    var opts = {};
    Ext.apply(opts, this.layer_configs[name].options, {
      type: 'jpeg',
      transitionEffect: 'resize',
      wrapDateLine: false,
      visibility: true
    });
    return new OpenLayers.Layer.XYZ(
				this.layer_configs[name].name, 
				this.layer_configs[name].baseUrl + "${x}/${y}/${z}", 
				opts
		);
  },

  wmsMapType: function(name) {
    return new OpenLayers.Layer.WMS(
      this.layer_configs[name].name, this.layer_configs[name].baseUrl, this.layer_configs[name].params, this.layer_configs[name].options
    );
  },

  init: function(map) {
    this.map = map;
  },

  loadLayers: function(category) {
    switch(category) {
      case 'aa':
        this.addLayer('bdl_aa');
        this.addLayer('sdmi_soy_aa');
        break;
      case 'bdl':
        this.addLayer('bdl_aa');
        break;
    }
  },

  getLayer: function(name) {
    var type = this.layer_configs[name].type;
    if(type == 'tiles') {
      return this.imageMapType(name);
    } else if(type == 'wms') {
      return this.wmsMapType(name);
    }
  },

  showLabels: function() {
    //this.map.overlayMapTypes.insertAt(0, this.imageMapType('labels'));
  }
});
