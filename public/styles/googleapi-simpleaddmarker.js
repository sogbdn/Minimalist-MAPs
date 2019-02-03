// $(document).ready(function(){

  function initMap() {
    var map = new google.maps.Map
    // $('.map')
    (document.getElementById('map'), {
      zoom: 17,
      center: {lat: 45.496338, lng: -73.570732 }
    });
    map.addListener('dblclick', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
      //infowindow.setContent('Zoom: ' + map.getZoom());
      //console.log(e);
    });
  }
  
  function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      zoom: map.getZoom()
    });
    console.log(marker)
    console.log(markerzoom)
    map.panTo(latLng);
    console.log(latLng.lat());
    console.log(latLng.lng());
    }
  // })