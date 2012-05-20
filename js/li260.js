var map;
var geocoder;
function initialize() {
	geocoder = new google.maps.Geocoder();
	var li260Styles = [ { elementType: "labels", stylers: [ { visibility: "off" } ] },
	{ featureType: "administrative", stylers: [ { visibility: "off" } ] },
	{ featureType: "landscape", stylers: [ { visibility: "off" }, { hue: "#00ff00" }, { gamma: 0.01 }, { lightness: 50 }, { saturation: 100 } ] },
	{ featureType: "poi", stylers: [ { visibility: "off" } ] },
	{ featureType: "transit", stylers: [ { visibility: "off" } ] },
	{ featureType: "water", stylers: [ { visibility: "simplified" }, { hue: "#0000ff" }, { gamma: 0.01 }, { lightness: 50 }, { saturation: 100 } ] },
	{ featureType: "road.highway", stylers: [ { visibility: "simplified" }, { hue: "#808080" }, { saturation: -100 }, { gamma: 0.01 }, { lightness: 50 } ] },
	{ featureType: "road.local", stylers: [ { visibility: "simplified" }, { hue: "#808080" }, { invert_lightness: true }, { gamma: 0.01 }, { lightness: 50 } ] },
	{ featureType: "road.arterial", stylers: [ { visibility: "simplified" }, { hue: "#808080" }, { saturation: -100 }, { gamma: 0.01 }, { lightness: 50 } ] } ];
	var styledMapOptions = {
		map: map, 
		name: "li260.maps.MapTypeId.Circuit"
	}
	var li260Type = new google.maps.StyledMapType(li260Styles,
		{name: "LI260"});
		var mapOptions = {
			center: new google.maps.LatLng(48.84653,2.355194),
			zoom: 15,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'li260_circuit']
			}
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		map.mapTypes.set('li260_circuit', li260Type);
		map.setMapTypeId('li260_circuit');
	}
	function codeAddress() {
		var address = document.getElementById("address").value;
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
	function handleEnter(inField, e) {
		var charCode;
		if(e && e.which){
			charCode = e.which;
		}else if(window.event){
			e = window.event;
			charCode = e.keyCode;
		}
		if(charCode == 13) {
			codeAddress();
		}
	}