var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var currLoc = new google.maps.LatLng(myLat, myLng)
var mapOptions = {
	center: new google.maps.LatLng(myLat,myLng),
	zoom: 10,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;

function initialize(){

		map = new google.maps.Map(document.getElementById													     ("map_canvas"),mapOptions);
		getCurrLoc();
		
}
function getCurrLoc(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	else{
		alert("Geolocation is not supported by your web browser.")
	}
}
function renderMap(){
	currLoc = new google.maps.LatLng(myLat, myLng);
	map.panTo(currLoc);
	
	marker = new google.maps.Marker({ position: currLoc, title: "Current 											Location"});
	marker.setMap(map);
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map,marker);
	});
}