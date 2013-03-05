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
var str
var strCar
var parsed
var Car_Wal
var stationAbbrev
var request
var requestCar
var lineCoords = []
var infowindow = new google.maps.InfoWindow();
var locsRed = {"RALE":[42.395428,-71.142483, "Alewife"],"RDAV": [42.39674,-71.121815, "Davis"],"RPOR":[42.3884,-71.119149, "Porter Square "],"RHAR": [42.373362,-71.118956, "Harvard Square "],"RCEN":[42.365486,-71.103802, "Central Square"],"RKEN":[42.36249079,-71.08617653, "Kendall/MIT"],"RMGH":[42.361166,-71.070628, "Charles/MGH"],"RPRK":[42.35639457,-71.0624242, "Park Street"],"RDTC":[42.355518,-71.060225, "Downtown Crossing"],"RSOU":[42.352271,-71.055242, "South"],"RBRO":[42.342622,-71.056967, "Broadway"],"RAND":[42.330154,-71.057655, "Andrew"],"RJFK":[42.320685,-71.052391, "JFK/UMass"],"RSAV":[42.31129,-71.053331, "Savin Hill"],"RFIE":[42.300093,-71.061667, "Fields Corner"],"RSHA":[42.29312583,-71.06573796, "Shawmut"],"RASH":[42.284652, -71.064489,"Ashmont"],"RNQU":[42.275275,-71.029583, "North Quincy"],"RWOL":[42.2665139,-71.0203369, "Wollaston"],"RQUC":[42.251809,-71.005409, "Quincy Center Station"],"RQUA":[42.233391,-71.007153, "Quincy Adams"],"RBRA":[42.2078543,-71.0011385, "Braintree"]};


function initialize(){

		map = new google.maps.Map(document.getElementById													     ("map_canvas"),mapOptions)		
		redlineJSON();
		getCar_Wal();
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
	plotCar_Wal()
}

function plotRed(){
	i = 0;
	var marker;
	for (var index in locsRed) { 
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
	    
	    google.maps.event.addListener(marker, "click", function() {
	    	stationAbbrev = this.title;
		    get_RTInfo();
		    infowindow.setContent("<p>" + stationAbbrev + ' ' + locsRed[this.title][2] + ' ' + 'Station' + "<br/>" + RTInfo + "</p>")
			infowindow.open(map,this)
		    redlineJSON();
		})
		i++;
	}
	plot_Poly()
}

function plotCar_Wal(){
	if(Car_Wal == null){
		console.log('yousuck')
		return;
	}
	console.log('Carmenfuck')
	for (i=0;i<Car_Wal.length;i++) { 
		console.log('fucktitties')
		loc = Car_Wal[i].loc;
		console.log(loc.latitude, loc.longitude);
		currStat = new google.maps.LatLng(loc.latitude, loc.longitude);
	  	marker = new google.maps.Marker({
	    	position: currStat,
	    	icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
	    	title: 'dog'
	    	});
	    marker.setMap(map)
	    
	    google.maps.event.addListener(marker, "click", function() {
		    infowindow.setContent(this.title);
			infowindow.open(map,this);
		    getCar_Wal();
		})
	}

}
function redlineJSON(){
	request = new XMLHttpRequest();
    request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
    request.send(null);	  
    request.onreadystatechange = parsing; 
}

function parsing(){
	if (request.status == 200) {
		str = request.responseText;
		parsed = JSON.parse(str);
    }
}

function getCar_Wal(){
	requestCar = new XMLHttpRequest();
    requestCar.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
    requestCar.send(null);	  
    requestCar.onreadystatechange = parseCar_Wal
}

function parseCar_Wal(){
	if (requestCar.status == 200) {
		strCar = requestCar.responseText;
		Car_Wal = JSON.parse(strCar);
    }
    else{
	    alert('Whoops! It seems we cannot find Waldo or Carmen. Better luck next time!')
    }
}

function plot_Poly(){
	branch1 = [];
	branch2 = [];
	for(i=0;i<=16;i++){
		branch1[i]=lineCoords[i];
	}
	branch2[0]=lineCoords[13];
	for(i=17;i<lineCoords.length;i++){
		branch2[i-16]=lineCoords[i]
	}
	
	var TPath1 = new google.maps.Polyline({
    path: branch1,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
	
	
	var TPath2 = new google.maps.Polyline({
    path: branch2,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  TPath1.setMap(map);
  TPath2.setMap(map);
}

function get_RTInfo(){
    RTInfo = ' ';
    for(i = 0; i<parsed.length; i++){
    	stationNS = parsed[i].PlatformKey.substring(0,parsed[i].PlatformKey.length-1);
	    if(stationNS==stationAbbrev){
		    RTInfo = RTInfo + "<br/>" + parsed[i].PlatformKey[4] + ' ' + parsed[i].TimeRemaining + ' ';
		   
	    }
    }
}