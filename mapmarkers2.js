//this creates the map

function initMap() {
  var map = new google.maps.Map

  
  // $('.map')
  (document.getElementById('map'), {
    zoom: 17,
    center: {lat: 45.496338, lng: -73.570732 }
    
  });

 

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
    //infowindow.setContent('Zoom: ' + map.getZoom());
    //console.log(e);
  });

}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
    //infowindow.setContent('Zoom: ' + map.getZoom());
    
  });
  console.log(marker)
  map.panTo(latLng);
  console.log(latLng.lat());
  console.log(latLng.lng());
}


// for (var i = 0; i < marker.length; i++){
//   addMarker(merkers[i]);
// }

// function addMarker (props {
//   var marker = new google.maps.Marker({
//     position: props.coords,
//     map:map,
//   })

// })