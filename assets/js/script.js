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
      map.panTo({
        lat: lat,
        lng: lng,
      });
      getRestaurants(lat, lng);
    });
}

function submitHandler(event) {
  event.preventDefault();
  var location = document.getElementById('location').value;
  geocode(location);
}

document.getElementById('search').onsubmit = submitHandler;

$(document).ready(function () {
  $('.modal').modal();
});

$('ol').on('click', 'li', event => {
  M.Modal.getInstance(document.getElementById('modal')).open();
});
