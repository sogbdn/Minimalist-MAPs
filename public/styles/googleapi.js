/*#floating-panel {
        position: absolute;
        top: 10px;
        left: 25%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: 'Roboto','sans-serif';
        line-height: 30px;
        padding-left: 10px;
      }
      */

     var map;
      var markers = [];
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

      function initMap() {
        var montreal = {lat: 45.496338, lng: -73.570732};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: montreal,
          //mapTypeId: 'terrain'
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
          addMarker(event.latLng);
          
        });

        // Adds a marker at the center of the map.
        addMarker(montreal);
      }

      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'Hello World!',
          label: labels[labelIndex++ % labels.length],
          draggable:true,
          
        });
        markers.push(marker);
        console.log(markers);
        console.log(location.lat());
        console.log(location.lng());
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
      // console.log(`array of markers: ${markers})


// $(document).ready(function(){

  // function initMap() {
  //   var map = new google.maps.Map
  //   // $('.map')
  //   (document.getElementById('map'), {
  //     zoom: 17,
  //     center: {lat: 45.496338, lng: -73.570732 }
  //   });
  //   map.addListener('dblclick', function(e) {
  //     placeMarkerAndPanTo(e.latLng, map);
  //     //infowindow.setContent('Zoom: ' + map.getZoom());
  //     //console.log(e);
  //   });
  // }
  
  // function placeMarkerAndPanTo(latLng, map) {
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     map: map,
  //     zoom: map.getZoom()
  //   });
  //   console.log(marker)
  //   console.log(markerzoom)
  //   map.panTo(latLng);
  //   console.log(latLng.lat());
  //   console.log(latLng.lng());
  //   }
  // })