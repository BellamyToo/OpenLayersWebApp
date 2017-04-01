var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM({layer: 'sat'})
          }),
          new ol.layer.Vector({
                  title: "Sidewalk Issues",
                  source: new ol.source.Vector ({
                      url: 'https://jsonblob.com/api/jsonBlob/56b8ec1ce4b01190df4d97b8',
                      defaultProjection :'EPSG:4323', projection: 'EPSG:3857',
                      format: new ol.format.GeoJSON()
                  }),
                  style: new ol.style.Style({
                      image: new ol.style.Circle({
                        radius: 3,
                        fill: new ol.style.Fill({color: 'red'})
                      })
                    })
                })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-80.4922, 43.4498]),
          zoom: 17
        }),
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine()
        ])
      });

var element = document.getElementById('popup');

var popup = new ol.Overlay({

  element: element

});

map.addOverlay(popup)


map.on('click', function(evt){

  var feature = map.forEachFeatureAtPixel(evt.pixel,
  function(feature, layer) {

return feature;


});

  if ( feature ) {
var geometry = feature.getGeometry();
var coord = geometry.getCoordinates();

var nom = feature.getProperties();
//var nam = nom.type;
popup.setPosition(coord);
$(element).popover({
  'placement': 'top',
  'html': true,
  'content': '<p>'+feature.get('name')+'</p>'
});
$(element).popover('show');

  } else {
$(element).popover('destroy');


}

});
