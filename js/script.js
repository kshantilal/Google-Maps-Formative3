$(document).ready(function(){

var	map, marker, infoBox; //infobox
var markers = [];

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
			lat: -41.324098,
			lng: 174.795680,
		},
		zoom: 14,
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

	}
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsService = new google.maps.DirectionsService;

	// directionDisplay.setMap(map);

	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	addAllMarkers();
	HomeMarker();
	// marker.addListener("click", toggleBounce);
	// showDirection(directionService, directionDisplay);
	// document.getElementById('mode').addListener('change', function(){
	// 	showDirection(directionService, directionDisplay);
	// });

	directionsDisplay.setMap(map);

	showRoute(directionsService, directionsDisplay);
	document.getElementById('mode').addEventListener('change', function() {
	  showRoute(directionsService, directionsDisplay);
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

function HomeMarker(){
	marker = new google.maps.Marker({
		position: {
			lat: -41.324098,
			lng: 174.795680,
		},
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "img/homeMarker.png",
		
	})	
};


// function toggleBounce(){
// 	if(marker.getAnimation() === null){
// 		marker.setAnimation(google.maps.Animation.BOUNCE);

// 	} else {
// 		marker.setAnimation(null);
// 	}

// };



function AllInfoBox(marker){

	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(){
		infoBox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"

			);
		infoBox.open(map, marker); //this opens the info box

	});

};


function showRoute(directionsService, directionsDisplay) {
	var selectedMode = document.getElementById('mode').value;
	directionsService.route({
		origin: {
			lat: -41.324098,
			lng: 174.795680, 
		},			
		destination: {
			lat: -41.316821,
			lng: 174.804529,
		},  
		travelMode: google.maps.TravelMode[selectedMode]

	}, function(response, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(response);
			console.log(response);
			console.log(response.routes[0].legs[0].distance.text);
			} else {
			window.alert('Directions request failed due to ' + status);
			}
		});
}









}); //J-Query

