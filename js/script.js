$(document).ready(function(){

var	map, marker, infoBox; //infobox
var markers = [];
var currentMarker;
var savedLocation = false;
var	AllMarkers = [
	{
		lat: -41.291659,
		lng: 174.821180,
		title: "Shelly Bay",
		description: "Species: Snapper, Blue Cod, Kahawai",
		
	},
	{
		lat: -41.287503,
		lng: 174.824029,
		title: "Massey Car Park",
		description: "Species: Snapper, Blue Cod, Lemon Sharks",

	},
	{
		lat: -41.284121,
		lng: 174.826335,
		title: "Point Halsway Lighthouse",
		description: "Species: Blue Cod, Kingfish, Terakihi",
	},
	{
		lat: -41.292138,
		lng: 174.832966,
		title: "Mussel Farm",
		description: "Species: Blue Cod, Terakihi, Snapper, Trevally, Sharks",
	},
	{
		lat: -41.293738,
		lng: 174.835138,
		title: "Mahanga Bay",
		description: "Species: Snapper, Blue Cod, Terakihi, Trevally,",
	},
	{
		lat: -41.295499,
		lng: 174.836742,
		title: "Scorching Bay",
		description: "Species: Snapper, Blue Cod, Terakihi, Trevally, Kingfish",
	},
	{
		lat: -41.304271,
		lng: 174.831448,
		title: "Karaka Bay Whalf",
		description: "Species: Snapper, Blue Cod, Terakihi, Kingfish, Piper, Herring",
	},
	{
		lat: -41.329998,
		lng: 174.832247,
		title: "Breaker Bay Beach",
		description: "Species: Blue Cod, Trevally, Kahawai, Blue Moki",
	},
	{
		lat: -41.321149,
		lng: 174.833250,
		title: "Seatoun Beach",
		description: "Species: Trevally, Elephant Fish, Blue Moki, Kahawai",
	},
	{
		lat: -41.316821,
		lng: 174.804529,
		title: "Evans Bay Beach",
		description: "Species: Snapper, Blue Cod, Kahawai, Trevally",
	},


];

function init(){
	var mapOptions = {
		//Set where the map starts
		center: {
			lat: -41.299688,
			lng: 174.811406,
		},
		zoom: 13,
		disableDefaultUI: false,
		disableDoubleClickZoom: false,
		streetViewControl: true,
		scrollwheel: true,
		draggable: true,
		draggableCursor: "pointer",
		draggingCursor: "crosshair",
		fullscreenControl: true,
		keyboardShortcuts: false,
		mapTypeControlOptions:{
		position: google.maps.ControlPosition.TOP_CENTER,
		},
		
		styles: [

		{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#34495E'}]},
		{elementType: 'labels.text.fill', stylers: [{color: '#BDC3C7'}]},

		{
			featureType: "road",
			elementType: "geometry",
			stylers: [
			{color: "#6C7A89"},
			{saturation: -80}

			]
		},
		{
			  featureType: 'road',
			  elementType: 'labels.text.fill',
			  stylers: [{color: '#95A5A6'}]
		},

		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
			{color: "#ABB7B7"}

			]
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [{color: '#17263c'}]
		},
		{
			featureType: 'landscape.man_made',
			elementType: 'geometry',
			stylers: [
				{color: '#2C3E50'},
				
			]
		},
		{
			featureType: 'landscape.natural',
			elementType: 'geometry',
			stylers: [
				{color: '#34495E'},
				
			]
		},
		{
			featureType: 'landscape.natural.terrain',
			elementType: 'geometry',
			stylers: [
				{color: '#22313F'},
				
			]
		},

		

		]

	};


	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	addAllMarkers();
	FindUser();

	document.getElementById('mode').addEventListener('change', function() {
		if (savedLocation) {
			showRoute(currentMarker);
		} else{
			alert("Please select a fishing spot on the map");
			savedLocation = false;
		}
	  

	});

};

google.maps.event.addDomListener(window, 'load', init);

function addAllMarkers(){
	for (var i = 0; i < AllMarkers.length; i++) {
		marker = new google.maps.Marker({
			position:{
				lat: AllMarkers[i].lat,
				lng: AllMarkers[i].lng,
			},
			map: map,
			animation: google.maps.Animation.DROP,
			icon: "img/snapper.png",
			title: AllMarkers[i].title,
			description: AllMarkers[i].description,
		})
		AllInfoBox(marker);
		markers.push(marker);



	};

};




function AllInfoBox(marker){
	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(){
		infoBox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"

			);
		infoBox.open(map, marker); //this opens the info box
		currentMarker = marker;
		showRoute(marker);
		savedLocation = true;

	});

};

var directionsDisplay;
function showRoute(endlocation) {
	if (directionsDisplay) {
		directionsDisplay.setMap(null);
 	}
	
	directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	directionsDisplay.setMap(map);
	var selectedMode = document.getElementById('mode').value;
	directionsService.route({

		origin: userLocation.position,			
		destination: endlocation.position,  
		travelMode: google.maps.TravelMode[selectedMode],


	}, function(response, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(response);
			// console.log(response);
			// console.log(response.routes[0].legs[0].distance.text);
			DistanceDisplay(response.routes[0].legs[0].distance.text, response.routes[0].legs[0].duration.text, response.routes[0].legs[0].end_address);
			
			} else {
			window.alert('Directions request failed due to ' + status);
			}
		});
};

function DistanceDisplay(distance,duration,end_address){
	var Details = $("#Details").val();
	$("#routeDistance").empty().prepend("<div><h4>"+distance+"</h4></div>");
	$("#routeDuration").empty().prepend("<div><h4>"+duration+"</h4></div>");
	$("#routeAddress").empty().prepend("<div><h4>"+end_address+"</h4></div>");

};

function FindUser(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			userLocation = new google.maps.Marker({
				position: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				},
				map: map,
				icon: "img/homeMarker.png",
				animation: google.maps.Animation.BOUNCE,
				zoom: 14,
			});
			map.panTo(userLocation.position);


		});


	}
};



}); //J-Query

