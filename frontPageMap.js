
var browserSupportsLocation =  new Boolean();
var somerville = new google.maps.LatLng(42.3875, -71.1000);

function initialize() 
{ 
    var mapOptions =
    {
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        panControl: false,
        zoomControl: false,
        scaleControl: true,
        streetViewControl: false,
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

 	// Browser supports GeoLocation
    if(navigator.geolocation)
    {
    	browserSupportsLocation = true;
    	navigator.geolocation.getCurrentPosition(function(position)
      {
      	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     	  map.setCenter(userLocation);
        addMarker(userLocation,"My location" + "</br>Lat: " + position.coords.latitude + "</br> Long: " + position.coords.longitude,'blue-dot.png');
        findClosestStop(position.coords.latitude,position.coords.longitude)
        findWaldoCarmen(position.coords.latitude,position.coords.longitude)
        },
        function()
        {
        handleNoGeolocation(browserSupportsLocation);
        });
    }
     // Browser doesn't support Geolocation
    else
    {
    	browserSupportsLocation = false;
    	handleNoGeolocation(browserSupportsLocation);
  	}
  
  	function handleNoGeolocation(errorFlag) {
    	if (errorFlag == true) {
      		alert("Geolocation service failed.");
      		userLocation = somerville;
      }
      else {
          alert("Your browser doesn't support geolocation. We've placed you in Somerville.");
          userLocation = somerville;
      }
      map.setCenter(userLocation);
  	}
}
 
