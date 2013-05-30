var map;
var geocoder;

var paris = new google.maps.LatLng(48.856614,2.352222);
google.maps.visualRefresh = true;

// largeur_route : taille des routes
// valeur : de 0 à 8
// nb : pour obtenir une largeur de route proportionelle à la largeur réelle
// de l'axe routier, il faut retirer weight dans le style.
var largeur_route = 2;

// initialisation du Style, de la carte, et affichage
function initialize() {
    geocoder = new google.maps.Geocoder();
    var li260Styles = [
      {
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "landscape.natural",
        "stylers": [
          { "color": "#00ff00" },
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#808080" },
          { "weight": largeur_route }
        ]
      },{
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#0000ff" }
        ]
      }
    ];
    var styledMapOptions = {
        map: map,
        name: "li260.maps.MapTypeId.Circuit"
    }
    var li260Type = new google.maps.StyledMapType(li260Styles, {
        name: "LI260"
    });
    var mapOptions = {
        center: paris,
        zoom: 7,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'li260_circuit']
        }
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.mapTypes.set('li260_circuit', li260Type);
    map.setMapTypeId('li260_circuit');
}

// codeAddress permet de géocoder une adresse
// ie. obtenir les coordonnées géographiques à partir d'une adresse
function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// handleEnter permet de géocoder l'adresse entrée lors de l'appui sur la touche Entrée
function handleEnter(inField, e) {
    var charCode;
    if (e && e.which) {
        charCode = e.which;
    } else if (window.event) {
        e = window.event;
        charCode = e.keyCode;
    }
    if (charCode == 13) {
        codeAddress();
    }
}
