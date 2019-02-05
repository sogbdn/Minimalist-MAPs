

var map;
var markers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0; // this is the index of the abc assignments, but it's not being emptied when the array is deleted
var infoWindow;
//let markerlatlong = []


//originally montreal was being used as the static start location--- test location shifts to geolocation. to test this function i have the map first load in newzealand. where i'd rather be.

function initMap() {
  //var montreal = {lat: 45.496338, lng: -73.570732};
  var starterlocation = {lat: 45.496338, lng: -73.570732};
// get map latlng ---> console.log(location.lat());console.log(location.lng());

  // this was where i tried to create an array of static maker locations, that would load at initialization. but it only works on the first called marker.

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: starterlocation,
  });

  infoWindow = new google.maps.InfoWindow;
  infoWindow.open(map);
  infoWindow.setContent(`<br><li><b>click on map to add marker</li><li>click on marker to add and save details</li><li>drag marker to reposition</li><br><p align='right'>Save Your Map to the Right ></b></p>`);
  infoWindow.setPosition(starterlocation);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // console.log(position.coords.latitude)
      // console.log(map.getZoom())
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
    
    console.log(map.coords.latitude)
    
    console.log(map.coords.longitude)
  }


  // This event listener will call addMarker() when the map is clicked. addEventListener doesn't work for some reason--- seems to be related to syntax that google needs specifically to be related to their map. 

  map.addListener('click', function(event) {
    var marker = addMarker(event.latLng);
    // var markerdetails = {
    //   url: 'http://localhost:8080/api/markers'
    //   method: 'POST',
    //   data: {
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng(),
    //     map_id: map.id;
    //   }

    //   $.ajax(markerdetails)
    // .done(function (id) {
    //   marker.id = id
      
    //   //posts to backend
    //   //map.id = 1;
    //   //backend sends back id
    //   //addnewMap(response)
    //   console.log('adding marker to database')     
    // })
    // .fail(function(error){
    //   console.log('ajax fail')
    //   console.log(error);
    // })
    // .always(function(){
    //   console.log('ajax always test')
    // });

    });
  }


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
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

  markers.push(marker); // this is the array that all the marker points are being pushed too.
  console.log(markers); // this is the complex object 
  console.log(location.lat());
  console.log(location.lng());

  //this is the popup window and form for each marker. 

  var contentString = 
  `<div id="content"><div id="table">
  <table>
  <tr>
  <form class="infoWindow" id="info-window">
  <td>Name:</td> 
  <td><input type='text' id='marker_name'/> </td> 
  </tr>
  <tr>
  <td>Description:</td> 
  <td><input type='text' id='marker_description'/> </td> 
  </tr>
  
    <tr><td></td><td><input type='submit' value='Save'/></td></tr>
  </table>
  </form>
  </div></div>`;

//----->>> this one works but is not conditional to the state of other windows-------> 

  marker.addListener('click', function() {
    
    /*var*/ infowindow = new google.maps.InfoWindow({
      content: contentString//dynamicinfobox//
    });
    infowindow.open(map, marker);
    //console.log('clicking');
  });

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

// ----------> THIS RELOADS THE ARRAY OF MARKERS/Objects --- 
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
var reloadmap = document.getElementById('reloadmap');
var hidemap = document.getElementById('hidemap');
var deletemap = document.getElementById('deletemap');


reloadmap.addEventListener('click', function(event) {
  setMapOnAll(map);
  console.log('clicking')
});
hidemap.addEventListener('click', function(event) {
  setMapOnAll(null);
  console.log('clicking')
});
deletemap.addEventListener('click', function(event) {
deleteMarkers();
resetlabelindex();
//labelIndex = 0; //this isn't resetting things
console.log('clicking')
});

///------> EVERYTHING RELATED TO TESTING THE MARKER ARRAY ----->

function deleteMarkers() {
clearMarkers();
resetlabelindex();
//the clearing of the marker isn't working YET. so when you delete the map the letters aren't yet resetting
markers = [];
} 

function resetlabelindex (){
  labelIndex = 0; 
}

function clearMarkers() {
  setMapOnAll(null);
}


function showMarkers() {
  setMapOnAll(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}



///------> EVENT LISTENER ------ > > > 

let mapname = ''
let mapdesc = ''

$('#mapform').on('submit', function (event){
  event.preventDefault();
  mapname = $('#map_name').val();
  mapdesc = $('#map_description').val();
  var captureMap = {
    //id:, ---> created by the database 
    name: mapname,
    description: mapdesc,
    lat: map.getCenter().lat(), 
    lng: map.getCenter().lng(),
    zoom: map.getZoom(),
    user_id: 1,
  }
  addnewMap(captureMap);
});


$('#info-window').on('submit', function (event){
  event.preventDefault();
  var markname = $('#marker_name').val();
  var markdesc = $('#marker_description').val();
  var captureMap = {
    //id:, ---> created by the database 
    name: markname,
    description: markdesc,
    lat: map.getCenter().lat(), 
    lng: map.getCenter().lng(),
    zoom: map.getZoom(),
    user_id: 1,
  }
  addnewMap(captureMap);
});

//------> Ajax to send map data

function addnewMap(inputData){
  const mapdetails = { 
    url: "http://localhost:8080/api/maps",
    method: 'POST',
    data: inputData
  };
  
  $.ajax(mapdetails)
    .done(function (response) {
      map.id = 1;//////hardcoded
      //backend sends back id
      //addnewMap(response)
      console.log('ajax inside test')     
    })
    .fail(function(error){
      console.log('ajax fail')
      console.log(error);
    })
    .always(function(){
      console.log('ajax always test')
    });
}


//-------> AJAX to GET data

function loadMap(){
  const options = { 
    url: "http://localhost:8080/tweets", //----> have to get route to indiv route form Sonja
    method: 'GET',
    dataType: 'json'
  }
  $.ajax(options)
  .done(function (response) {
    renderMap(response);
  }).fail(function(error){
  }).always(function(){
  });
}
loadMap();



/*function renderMap (maps) {
  $('#map').prepend(
    `<article class="box2">
    <header id ="titlespace2">
      <img class="userlogo" src="${tweets.user.avatars.small}">
      <h2 id="username">${tweets.user.name}</h2>
      <span class="id">${tweets.user.handle}</span>
    </header>
    <div class="tweetresponse">${escape(tweets.content.text)}
    </div>
    <footer id="tweetfooter"><span class="leftside"><p class="tinytype">${timestamp(tweets.created_at)}</p></span><span class="rightside"><img class="flaglikeretweet" src="/images/likeretweet.gif"></span></footer>
    </article>`
  );
}
*/
