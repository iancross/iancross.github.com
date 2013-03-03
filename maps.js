var myLat = 0
var myLng = 0
var request = new XMLHttpRequest()
var currLoc = new google.maps.LatLng(myLat, myLng)
var mapOptions = {
	center: new google.maps.LatLng(myLat,myLng),
	zoom: 10,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
var map
var marker
var infowindow = new google.maps.InfoWindow();
var locsRed = {"RALE":"42.395428,-71.142483","RDAV": "42.39674,-71.121815","RPOR":"42.3884,-71.119149","RHAR": "42.373362,-71.118956","RCENN":"42.365486,-71.103802","RKEN":"42.36249079,-71.08617653","RMGH":"42.361166,-71.070628","RPRK":"42.35639457,-71.0624242","RDTC":"42.355518,-71.060225","RSOU":"42.352271,-71.055242","RBRO":"42.342622,-71.056967","RAND":"42.330154,-71.057655","RJFK":"42.320685,-71.052391","RSAV":"42.31129,-71.053331","RFIE":"42.300093,-71.061667","RSHA":"42.29312583,-71.06573796","RASH":"42.284652,-71.064489","RNQU":"42.275275,-71.029583","RWOL":"42.2665139,-71.0203369","RQUC":"42.251809,-71.005409","RQUA":"42.233391,-71.007153","RBRA":"42.2078543,-71.0011385"};


function initialize(){

		map = new google.maps.Map(document.getElementById													     ("map_canvas"),mapOptions)
		getCurrLoc()
		parsed = JSON.parse(locsRed);
		plotRed()
		
}
function getCurrLoc(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude
			myLng = position.coords.longitude
			renderMap()
		})
	}	
	else{
		alert("Geolocation is not supported by your web browser.")
	}
}
function renderMap(){
	currLoc = new google.maps.LatLng(myLat, myLng)
	map.panTo(currLoc)
	
	marker = new google.maps.Marker({ position: currLoc, title: "Current 											Location"})
	marker.setMap(map)
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title)
		infowindow.open(map,marker)
	})
}
function plotRed(){
	var marker, i
	for (i = 0; i < locsRed.length; i++) {  
	  	marker = new google.maps.Marker({
	    	position: new google.maps.LatLng(locsRed[i]),
	    	map: map
	    	});
	}
}