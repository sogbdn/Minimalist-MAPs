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
//let markerlatlong = []

function initMap() {
  var montreal = {lat: 45.496338, lng: -73.570732};
  var test2 = {lat: 45.484905786674126, lng: -73.55345052731707};
  var test3 = {lat: 45.484905786674126, lng: -73.57247995596919};

  // var manyplaces = [{lat: 45.496338, lng: -73.570732},{lat: 46.496338, lng: -74.570732}, {lat: 45.596338, lng: -73.900732}]

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: montreal,
  });

  // This event listener will call addMarker() when the map is clicked.
  //This has been set to dblclick, but dblclick also triggers a zoom in, so separating out these actions will be necessary. but i want to save the single click for testing the info windows
  map.addListener('click', function(event) {
    addMarker(event.latLng);
    
  });

  // Adds a start marker at the center of the map.
  //addMarker(montreal); //--->> this was a hard coded marker position.. remember this maybe for testing data. 
  // for (let m = 0; m < manyplaces.length; m++){
  //   addMarker(manyplaces[m]);
  // }
 z //so addMarker can only be called once? ?? WHYYYYYYY....

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

  //below was an attempt to create a more simplified object storing marker data. but without the full content of the position: location, everything stopped working. the longlat is not enough, even though location is technically the long and lat. this is because of how the addMarker function was written... position could theoretically : {location.lat(), location.lng()}

  // var markerlatlong = new google.maps.Marker({
  //   position: location,
  //   lat: location.lat(), 
  //   lng: location.lng(),
  //   map: map
  // });

  //datamarker.push(markerlatlong);
  markers.push(marker);
  console.log(markers);
  console.log(location.lat());
  console.log(location.lng());

  var contentString = 
  `<div id="content"><div id="table">
  <table>
  <tr>
  <td>Name:</td> 
  <td><input type='text' id='name'/> </td> 
  </tr>
  <tr>
  <td>Description:</td> 
  <td><input type='text' id='description'/> </td> 
  </tr>
  <tr><td>Type:</td> 
    <td>
    <select id='type'> +
      <option value='bar' SELECTED>resting</option>
      <option value='running'>running</option>
      <option value='reading'>reading</option>
      <option value='reposing'>reposing</option>
      <option value='ruminating'>ruminating</option>
      <option value='rummaging'>rummaging</option>
      <option value='hiding'>hiding</option>
    </select> </td></tr>
    <tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr>
  </table>
  </div></div>`;

//----->>> this one works but is not conditional to the state of other windows-------> 

  marker.addListener('click', function() {
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, marker);
    //console.log('clicking');
  });

  //----->>>

//   var infowindow = new google.maps.InfoWindow();

// for (var i = 0, marker; marker = markers[i]; i++) {
//   google.maps.event.addListener(marker, 'click', function(e) {
//     //infowindow.setContent('Marker position: ' + this.getPosition());
//     infowindow.open(map, this);
//   });
// }

  // marker.addListener('click', function() {
  //   //infowindow.close(map, marker);
  //   infowindow.close();
  //   infowindow = new google.maps.InfoWindow({   
  //     content: contentString
  //   });
  //   infowindow.open(map, this);
  //   //console.log('clicking');
  // });
}
 
  // // Info Window With Click 
	// google.maps.event.addListener(marker, 'click', function() {
	// 	infowindow.open(map,marker);
	// });

	// // Info Window Without Click 
  // infowindow.open(map,marker);
  

// THIS RELOADS THE STORED ARRAY OF MARKERS --- 
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
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
resetlabelindex();
//labelIndex = 0; //this isn't resetting things
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

function resetlabelindex (){
  labelIndex = 0;
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