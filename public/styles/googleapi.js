

var map;
var markers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0; 
var infoWindow;



function initMap() {
  //var montreal = {lat: 45.496338, lng: -73.570732};
  var starterlocation = {lat: 45.496338, lng: -73.570732};


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: starterlocation,
  });

  infoWindow = new google.maps.InfoWindow;
  infoWindow.open(map);
  infoWindow.setContent(`<p align="center">Viewing Current Location!</p><b><li>Save Your Map</li><li>click on map to add marker</li><li>click on marker to add and save details</li><li>drag marker to reposition</li></b></p>`);
  infoWindow.setPosition(starterlocation);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
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
    var marker = addMarker(event.latLng);

    var markerdetails = {
      url: `http://localhost:8080/api/maps/${map.id}/markers`,
      method: 'POST',
      data: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        map_id: map.id
      }
    };

    $.ajax(markerdetails)
    .done(function (response) {  
      marker.id = response.id;
      console.log(`marker-------- ID------: ${marker.id}`);
    })
    .fail(function(error){
      console.log(error);
    })
    .always(function(){
     
    });
  });
};


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    `Error: The Geolocation service failed.` :
    `<br><b><li>Save Your Map</li><li>click on map to add marker</li><li>click on marker to add and save details</li><li>drag marker to reposition</li><br></b></p>`
    );
  infoWindow.open(map);
}

// Adds a marker to the map and push to the array.// 
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Hello World!',
    label: labels[labelIndex++ % labels.length],//this was for assigning abcs for everything
    draggable: true
  });

  markers.push(marker); // this is the array that all the marker points are being pushed too.
  

  marker.addListener('click', function() {

    var contentString = 
    `<div id="content"><form class="infoWindow" id="info-window">Name:<br><input type='text' id='marker_name'/><br>Description:<input type='text' id='marker_description'/> <br><input type='submit' value='Save'/><input type="hidden" id="hidden_value" value = "${this.id}"></hidden></form></div>`
    
    /*var*/ infowindow = new google.maps.InfoWindow({
      content: contentString//dynamicinfobox//
    });

    google.maps.event.addListener(infowindow, 'domready', function() {
      // whatever you want to do once the DOM is ready
            document.getElementById('info-window').addEventListener('submit', function(event) {
              event.preventDefault();
              console.log("submit info window")
              console.log($(this));
              const markname = $(this).find("input[id ='marker_name']").val();
              
              //$('#wrapper').find("input[value='"+value+"']").attr('id');
              const descname = $(this).find("input[id ='marker_description']").val();
              const markerid = $(this).find("input[id ='hidden_value']").val();
              // console.log(markname);
              // console.log(descname);
              // console.log(`-------${markid}----`);


              var captureMarker = {
                //id:, ---> created by the database 
                name: markname,
                description: descname,
                //markerid: markid
              }
              addnewMarker(captureMarker, markerid);
            })
          });

    infowindow.open(map, marker);
    var idbox = $('<input>').attr('type','hidden').attr('value', this.id)
    //$('#info-window').prepend(`<h5>testing</h5>`);
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
  return marker;

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

  console.log('newmap', captureMap)
  addnewMap(captureMap);
});


$('#info-window').on('submit', function (event){
  event.preventDefault();
  var markname = $('#marker_name').val();
  console.log(markname);
  var markdesc = $('#marker_description').val();
  console.log(markdesc);
  var captureMap = {
    //id:, ---> created by the database 
    name: markname,
    description: markdesc,

    // lat: map.getCenter().lat(), 
    // lng: map.getCenter().lng(),
    // zoom: map.getZoom(),
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
      map.id = response[0];
      console.log(response)
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

//--------> AJAX to send marker data

function addnewMarker(inputData, markerid){
  const markerdetails = { 
    url: `http://localhost:8080/api/markers/${markerid}`,
    method: 'POST',
    data: inputData
  };
  
  $.ajax(markerdetails)
    .done(function (response) {
      console.log(response)
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