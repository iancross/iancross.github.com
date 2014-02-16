var browserSupportsLocation =  new Boolean();
var somerville = new google.maps.LatLng(42.3875, -71.1000);

function initialize() 
{ 
    var mapOptions =
    {
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        panControl: false,
        scaleControl: true,
        streetViewControl: false,
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

 	// Browser supports GeoLocation
    if(navigator.geolocation)
    {
      console.log("fuck!");
    	browserSupportsLocation = true;
    	navigator.geolocation.getCurrentPosition(function(position)
      {
      	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     	  map.setCenter(userLocation);
        google.maps.event.addListener(map, "click", function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
            alert("Lat=" + lat + "; Lng=" + lng);
});
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