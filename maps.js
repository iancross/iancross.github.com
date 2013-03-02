function initialize(){
	var mapOptions = {
		center: new google.maps.LatLng(42.356627,-71.061707),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById													     ("map_canvas"),mapOptions);
		
}