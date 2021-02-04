var myMap = L.map('map', {
  center: [28.5, -81.3],
  zoom: 9,
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution:
    "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: document.getElementById('map').getAttribute('data-app-id'),
}).addTo(myMap);

function geocode(location) {
  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyDyJ3NFA3-3b3s0whvDQzP9IpKG1gIRLIU',
      },
    })
    .then(response => {
      console.log(response);

      var formattedAddress = response.data.results[0].formatted_address;

      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      myMap.panTo({
        lat: lat,
        lng: lng,
      });
    });
}

function btnSearchHandler() {
  var location = document.getElementById('location').value;
  geocode(location);
}

document.getElementById('search').onclick = btnSearchHandler;
