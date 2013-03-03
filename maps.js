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
var locsRed = ["42.395428,-71.142483", "42.39674,-71.121815","42.3884,-71.119149", "42.373362,-71.118956","42.365486,-71.103802","42.36249079,-71.08617653","42.361166,-71.070628","42.35639457,-71.0624242","42.355518,-71.060225","42.352271,-71.055242","42.342622,-71.056967","42.34356776,-71.05258581","42.33979549,-71.05003445","42.33602321,-71.04748309","42.33225094,-71.04493174","42.32847866,-71.04238038","42.32470639,-71.03982902","42.32093411,-71.03727766","42.31716184,-71.03472631","42.31338956,-71.03217495","42.30961729,-71.02962359"];


function initialize(){

		map = new google.maps.Map(document.getElementById													     ("map_canvas"),mapOptions);
		getCurrLoc();
		plotRed();
		
}
function getCurrLoc(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}	
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
function plotRed(){
	var marker, i;
	for (i = 0; i < locsRed.length; i++) {  
	  	marker = new google.maps.Marker({
	    	position: new google.maps.LatLng(locsRed[i]),
	    	map: map
	});
}