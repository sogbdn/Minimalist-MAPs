var map;
var markers = [];
// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// let labelIndex = 0; 
var infoWindow;
function initMap() {
  var maplocation = {/*map.lat, map.lng*/}
  //------> hardcode {lat: 45.496338, lng: -73.570732};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: maplocation,
  });

  infoWindow = new google.maps.InfoWindow;


  // map.addListener('click', function(event) {
  //   addMarker(event.latLng);
  // });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  for (addmarkers of maptable.markers){
    var marker = new google.maps.Marker({
    
    position: addmarkers,
    map: map,
    title: 'Hello World!',
    
  });
}

//----->>> this one works but is not conditional to the state of other windows-------> 

  marker.addListener('click', function() {
    /*var*/ infowindow = new google.maps.InfoWindow({
      content: dynamicinfobox//not loading even simple content
    });
    infowindow.open(map, marker);
    //console.log('clicking');
  });
}


var dynamicinfobox = 
`<div id="content"><div id="table">
<table>
<p>something</p>
</table>
</div></div>`; /// not working properly

// THIS RELOADS THE STORED ARRAY OF MARKERS --- 
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

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
resetlabelindex();
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


function loadMaps(){
  const options = { 
    url: "http://localhost:8080/tweets",
    method: 'GET',
    dataType: 'json'
  }
  $.ajax(options)
  .done(function (response) {
    renderMaps(response);
  }).fail(function(error){
  }).always(function(){
  });
}
loadMaps();


function renderTweets(tweets) {

  for (var tweetdeets of tweets) {
    createTweetElement(tweetdeets);
    tweetrender = tweetdeets;
  }
}
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


  
  // var dynamicinfobox = 
  // `<div id="content"><div id="table">
  // <table>
  // <tr>
  // <td>Name:</td> 
  // <td><div class="markername">${maps.markername}</div></td> 
  // </tr>
  // <tr>
  // <td>Description:</td> 
  // <td><p>${maps.markerdescription}</p></td> 
  // </tr>
  // <tr><td><button type="button" class="btn btn-secondary btn-sm">Edit </button></td> 
  //   <td>
  //   </td></tr>
  //   <tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr>
  // </table>
  // </div></div>`;

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




  //this is the popup window and form for each marker. but  different one will have to be built to pass the object vars from the database
  // var contentString = 
  // `<div id="content"><div id="table">
  // <table>
  // <tr>
  // <td>Name:</td> 
  // <td><input type='text' id='name'/> </td> 
  // </tr>
  // <tr>
  // <td>Description:</td> 
  // <td><input type='text' id='description'/> </td> 
  // </tr>
  // <tr><td>Type:</td> 
  //   <td>
  //   <select id='type'> +
  //     <option value='bar' SELECTED>resting</option>
  //     <option value='running'>running</option>
  //     <option value='reading'>reading</option>
  //     <option value='reposing'>reposing</option>
  //     <option value='ruminating'>ruminating</option>
  //     <option value='rummaging'>rummaging</option>
  //     <option value='hiding'>hiding</option>
  //   </select> </td></tr>
  //   <tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr>
  // </table>
  // </div></div>`;