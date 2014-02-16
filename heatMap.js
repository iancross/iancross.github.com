var browserSupportsLocation =  new Boolean();
var somerville = new google.maps.LatLng(42.3875, -71.1000);

function initializeHeat() 
{ 
  set_name();
  var heatmapData = [
  new google.maps.LatLng(87.782, 50.447),
  new google.maps.LatLng(37.782, -40.445),
  new google.maps.LatLng(57.782, -100.443),
  new google.maps.LatLng(-37.782, 122.441),
  new google.maps.LatLng(137.782, -122.439),
  new google.maps.LatLng(140.782, -150.437),
  new google.maps.LatLng(17.782, -20.435),
  new google.maps.LatLng(-37.785, -130.447),
  new google.maps.LatLng(-97.785, 122.445),
  new google.maps.LatLng(-150.785, -100.443),
  new google.maps.LatLng(-37.785, 90.441),
  new google.maps.LatLng(-47.785, -1760.439),
  new google.maps.LatLng(-37.785, 10.437),
  new google.maps.LatLng(-37.785, -160.435)
  ]
};

         centerWorld = new google.maps.LatLng(24.067865,-9.84375);
map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: centerWorld,
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        panControl: false,
        scaleControl: true,
        streetViewControl: false,
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});
heatmap.setMap(map);
}

function set_name(){
name = localStorage['username'];
	if(name == null){
		return;
	}
    if(document.getElementById('custom_user')){
   		document.getElementById('custom_user').value = name;
   		return;
   	}
}
