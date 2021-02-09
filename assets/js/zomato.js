/**
 * Javascript object to keep track of endpoint, api_key, and headers that may be needed in API call.
 * @type {Object}
 */
let zomato = {
  endpoint: 'https://developers.zomato.com/api/v2.1',
  api_key: '36ab1dde664b0ee5c6b7fe7b6afdc5f2',
  headers: {
    'user-key': '36ab1dde664b0ee5c6b7fe7b6afdc5f2',
  },
};

/**
 * Array to keep track of markers placed on map
 * @type {Array<marker>}
 */
var markers = [];

/**
 * Function to get restaurants close to a certain longitude and latitude
 * @param {float} lat - Restaurant Latitude (height)
 * @param {float} lng  - Restaurant Longitude (east-west)
 */
function getRestaurants(lat = 28.5, lng = -81.3) {
  let radius = L.GeometryUtil.length([map.getBounds().getSouthEast(), map.getBounds().getSouthWest()]) * 0.000621371;
  console.log(`Radius: ${radius}`);
  axios
    .get(`${zomato.endpoint}/search?q=restaurant&user-key=${zomato.api_key}&lat=${lat}&lon=${lng}&radius=${radius}`, {
      headers: zomato.headers,
    })
    .then(response => {
      console.log(response);

      let list = document.getElementById('restaurant-list');
      list.innerHTML = '';

      markers.forEach(marker => map.removeLayer(marker));

      let marker = L.marker(map.getBounds().getCenter(), {
        icon: myIcon,
        draggable: true,
        title: 'You are here',
      }).addTo(map);

      markers.push(marker);
      let results = response.data.results_found;

      if (results) {
        $('#icons').show();
        $('#restaurant-list').show();
        $('#no-results').hide();
      } else {
        $('#icons').hide();
        $('#restaurant-list').hide();
        $('#no-results').show();
      }

      let numShown;
      if (results > 10) numShown = 10;
      if (results < 10) numShown = results;

      for (let i = 0; i < numShown; i++) {
        let restaurant = response.data.restaurants[i];
        console.log(restaurant);
        restaurant = restaurant.restaurant;
        if (restaurant.location.latitude && restaurant.location.longitude) {
          marker = L.marker([restaurant.location.latitude, restaurant.location.longitude], {
            draggable: false,
            title: restaurant.name,
          }).addTo(map);

          // Binding a pop-up to our marker
          marker.bindPopup(restaurant.name);
          markers.push(marker);
        }
        let li = document.createElement('li');
        li.className = 'collection-item';

        listItemLink.innerHTML = `${restaurant.name} `;
        if (restaurant.highlights.includes('Delivery')) li.innerHTML += '<i class="fas fa-truck"></i>';
        if (restaurant.highlights.includes('Outdoor Seating')) li.innerHTML += '<i class="fas fa-sun"></i>';
        li.innerHTML += ` <em>${restaurant.phone_numbers}</em>`;
        list.appendChild(li);
      }
    });
}

function getRestaurantReviews() {
  res_id = 16615034;
  axios
    .get(`${zomato.endpoint}/reviews?user-key=&res_id=${res_id}`, {
      headers: zomato.headers,
    })
    .then(response => console.log(response));
}

// getRestaurantReviews();
