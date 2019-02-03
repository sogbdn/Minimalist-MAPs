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
      let labelIndex = 0;

      function initMap() {
        var montreal = {lat: 45.496338, lng: -73.570732};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: montreal,
          //mapTypeId: 'terrain'
        });

        // This event listener will call addMarker() when the map is clicked.
        //This has been set to dblclick, but dblclick also triggers a zoom in, so separating out these actions will be necessary. but i want to save the single click for testing the info windows
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
          //draggable:true,
          
        });
        markers.push(marker);
        console.log(markers);
        console.log(location.lat());
        console.log(location.lng());

        var contentString = `<div id="content"><p>apples apples apples<p></div>`;

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
        console.log(clicking);
      });

      }

      
  // // Info Window With Click 
	// google.maps.event.addListener(marker, 'click', function() {
	// 	infowindow.open(map,marker);
	// });

	// // Info Window Without Click 
	// infowindow.open(map,marker);



      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          // markers[i].addListener('click', function() {
          //   //infowindow.open(map, marker);
          //   console.log('clicking')
          // });
        }
        
      }

      /*a similar loop has to be made for all the info windows? although looking at the object attached to each marker, it seems like you save the title of the marker inside there...*/

      var reloadmap = document.getElementById('reloadmap');
      var hidemap = document.getElementById('hidemap');
      var deletemap = document.getElementById('deletemap');
      

      reloadmap.addListener('click', function(event) {
        setMapOnAll(map);
        console.log('clicking')
      });
      hidemap.addListener('click', function(event) {
        setMapOnAll(null);
        console.log('clicking')
      });
      deletemap.addListener('click', function(event) {
      deleteMarkers();
      labelIndex = 0;
      console.log('clicking')
    });

    function deleteMarkers() {
      clearMarkers();
      //the clearing of the marker isn't working YET. so when you delete the map the letters aren't yet resetting
      markers = [];
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