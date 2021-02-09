var map = L.map('map', {
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
}).addTo(map);

L.control.scale().addTo(map);

map.on('zoomend', () => {
  if (document.getElementById('location').value) document.getElementById('btnSearch').textContent = 'REDO-SEARCH';
});

var myIcon = L.icon({
  iconUrl: './assets/images/you_are_here.png',
  iconSize: [39, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, 0],
});
