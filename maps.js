var myLat = 0
var myLng = 0
var currLoc = new google.maps.LatLng(myLat, myLng)
var mapOptions = {
	center: new google.maps.LatLng(myLat,myLng),
	zoom: 10,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
var map
var RTInfo
var marker
var parsed
var stationAbbrev
var request
var lineCoords = []
var infowindow = new google.maps.InfoWindow();
var locsRed = {"RALE":[42.395428,-71.142483, "Alewife"],"RDAV": [42.39674,-71.121815, "Davis"],"RPOR":[42.3884,-71.119149, "Porter Square "],"RHAR": [42.373362,-71.118956, "Harvard Square "],"RCEN":[42.365486,-71.103802, "Central Square"],"RKEN":[42.36249079,-71.08617653, "Kendall/MIT"],"RMGH":[42.361166,-71.070628, "Charles/MGH"],"RPRK":[42.35639457,-71.0624242, "Park Street"],"RDTC":[42.355518,-71.060225, "Downtown Crossing"],"RSOU":[42.352271,-71.055242, "South"],"RBRO":[42.342622,-71.056967, "Broadway"],"RAND":[42.330154,-71.057655, "Andrew"],"RJFK":[42.320685,-71.052391, "JFK/UMass"],"RSAV":[42.31129,-71.053331, "Savin Hill"],"RFIE":[42.300093,-71.061667, "Fields Corner"],"RSHA":[42.29312583,-71.06573796, "Shawmut"],"RASH":[42.284652, -71.064489,"Ashmont"],"RNQU":[42.275275,-71.029583, "North Quincy"],"RWOL":[42.2665139,-71.0203369, "Wollaston"],"RQUC":[42.251809,-71.005409, "Quincy Center Station"],"RQUA":[42.233391,-71.007153, "Quincy Adams"],"RBRA":[42.2078543,-71.0011385, "Braintree"]};


function initialize(){

		map = new google.maps.Map(document.getElementById													     ("map_canvas"),mapOptions)
		getCurrLoc()		
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
	
	google.maps.event.addListener(marker, "click", function() {
		infowindow.setContent(this.title)
		infowindow.open(map,this)
	})
	plotRed()

}

function plotRed(){
	i = 0;
	var marker;
	for (var index in locsRed) { 
		//console.log(locsRed[index][0]);
		currStat = new google.maps.LatLng(locsRed[index][0],locsRed[index][1]);
		lineCoords[i] = currStat;
	  	marker = new google.maps.Marker({
	    	position: currStat,
	    	icon: {
		    	path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		    	strokeColor: "black",
		    	scale: 3
		    	},
	    	title: index
	    	});
	    marker.setMap(map)
	    console.log('before listener');

	    google.maps.event.addListener(marker, "click", function() {
		    request = new XMLHttpRequest();
	        request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	        request.send(null);	  
	        stationAbbrev = this.title;
	        request.onreadystatechange = parsing;
	        
	        /*function(){
		        	if (request.status == 200) {
			        	var str = request.responseText;
			        }
			        parsed = JSON.parse(str);
	        }*/

			infowindow.setContent("<p>" + stationAbbrev + ' ' + locsRed[this.title][2] + "<br/>" + RTInfo + "</p>")
			infowindow.open(map,this)
		})
		i++;
	}
	plot_Poly()
}

function plot_Poly(){
	var TPath = new google.maps.Polyline({
    path: lineCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  TPath.setMap(map);
}

function parsing(){
	if (request.status == 200) {
		str = request.responseText;
		parsed = JSON.parse(str);
    }
    RTInfo = ' ';
    for(i = 0; i<parsed.size; i++){
    	console.log('for loop')
	    if(parsed[i].PlatformKey==stationAbbrev.substring(0,stationAbbrev.length-1)){
	    	console.log('fuck shit');
		    RTInfo = parsed[i].PlatformKey[4] + ' ' + parsed[i].TimeRemaining + ' ';
	    }
    }
}