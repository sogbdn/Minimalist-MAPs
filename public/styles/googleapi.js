var map;
var markers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0; // this is the index of the abc assignments, but it's not being emptied when the array is deleted
var infoWindow;
var basket = []
//let markerlatlong = []
let getlat = ''
let getlng = ''
let getzoom = ''

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
      console.log(position.coords.latitude)
      console.log(map.getZoom())

      getlng = position.coords.latitude;
      getlat = position.coords.longitude;
       
      /* unreliable approach using an array
      basket.push(position.coords.latitude)
      basket.push(position.coords.longitude)
      basket.push(map.getZoom());*/
      console.log(basket)

      // infoWindow.setPosition(pos);
      // infoWindow.setContent(`Showing Current Location`);
      // infoWindow.open(map);
      // map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
    basket.push(map.coords.latitude)
    console.log(map.coords.latitude)
    basket.push(map.coords.longitude)
    console.log(map.coords.longitude)
  }

  // This event listener will call addMarker() when the map is clicked. addEventListener doesn't work for some reason--- seems to be related to syntax that google needs specifically to be related to their map. 

  map.addListener('click', function(event) {
    addMarker(event.latLng);
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
  <td>Name:</td> 
  <td><input type='text' id='marker_name'/> </td> 
  </tr>
  <tr>
  <td>Description:</td> 
  <td><input type='text' id='marker_description'/> </td> 
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
    
    /*var*/ infowindow = new google.maps.InfoWindow({
      content: contentString//dynamicinfobox//
    });
    infowindow.open(map, marker);
    //console.log('clicking');
  });
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
  //console.log('clickingform');
  mapname = $('#map_name').val();
  console.log(mapname)
  //basket.push(mapname)
  mapdesc = $('#map_description').val();
  //basket.push(mapdesc)
  console.log(mapdesc);
  addnewMap();
});
console.log(`tttesssstttiinnnngggg:`);
console.log(`tttesssstttiinnnngggg: ${basket}`)
console.log(`tttessssttting name: ${mapname}`)
console.log(`tttessssttting desc: ${mapdesc}`)

//------> Ajax to send map data

// function getlat (input){
//   return input;
// }


function addnewMap(input){
  const mapdetails = { 
    url: "http://localhost:8080/api/maps",
    method: 'POST',
    data: {
      //id:, ---> created by the database 
      name: mapname,
      description: mapdesc,
      lat: getlat, 
      lng: getlng,
      zoom: 11,
      user_id: 1,
    }
  };
  
  $.ajax(mapdetails)
    .done(function (response) {
      //addnewMap(response)
      console.log('ajax inside test')
      console.log(`tttessssttting name: ${getlng}`)
      console.log(typeof(getlng))
      console.log(`tttessssttting name: ${getlat}`)
      console.log(typeof(getlat))
      //console.log(`tttessssttting name: ${mapname}`)
      //console.log(`tttessssttting desc: ${mapdesc}`)
      //console.log(response) -->>> this is reprinting allll the html....
    })
    .fail(function(error){
      console.log('ajax fail')
      console.log(error);
    })
    .always(function(){
      console.log('ajax always test')
    });
}

// function loadtweets(){
//   const options = { 
//     url: "http://localhost:8080/tweets",
//     method: 'GET',
//     dataType: 'json'
//   }
//   $.ajax(options)
//   .done(function (response) {
//     renderTweets(response);
//   }).fail(function(error){
//   }).always(function(){
//   });
// }
// loadtweets();




// var dynamicinfobox = 
//   `<div id="content"><div id="table">
//   <table>
//   <p>something</p>
//   </table>
//   </div></div>`;


// console.log(`array of markers: ${markers})



//----->>>BELOW is attempting to detect when an infowindow is open elsewhere and close it then open the other. by trying to put the infowindow out of scope of the function that opens a infowindow, it's hoped it will reset/refresh. 

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



  //all the ${vars} below are made up. 
  

  /*
  var dynamicinfobox = 
  `<div id="content"><div id="table">
  <table>
  <tr>
  <td>Name:</td> 
  <td><div class="markername">${maps.markername}</div></td> 
  </tr>
  <tr>
  <td>Description:</td> 
  <td><p>${maps.markerdescription}</p></td> 
  </tr>
  <tr><td><button type="button" class="btn btn-secondary btn-sm">Edit </button></td> 
    <td>
    </td></tr>
    <tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr>
  </table>
  </div></div>`;*/

  /*
   $('#tweets-container').prepend(
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
  );*/

