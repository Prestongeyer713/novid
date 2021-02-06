var endpoint = 'https://developers.zomato.com/api/v2.1';
var api_key = '36ab1dde664b0ee5c6b7fe7b6afdc5f2';
var markers = [];

var headers = {
  'user-key': api_key,
};

function getRestaurants(lat = 28.5, lng = -81.3) {
  axios
    .get(`${endpoint}/search?user-key=${api_key}&q=restaurant&lat=${lat}&lon=${lng}&radius=50`, {
      headers: headers,
    })
    .then(response => {
      console.log(response);

      let tbody = document.getElementById('tbody');
      tbody.innerHTML = '';

      markers.forEach(marker => myMap.removeLayer(marker));

      response.data.restaurants.forEach(restaurant => {
        console.log(restaurant);
        restaurant = restaurant.restaurant;
        if (restaurant.location.latitude && restaurant.location.longitude) {
          var marker = L.marker([restaurant.location.latitude, restaurant.location.longitude], {
            draggable: false,
            title: restaurant.name,
          }).addTo(myMap);

          // Binding a pop-up to our marker
          marker.bindPopup(restaurant.name);
          markers.push(marker);
        }
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.textContent = restaurant.name;
        let phone = document.createElement('td');
        phone.textContent = restaurant.phone_numbers;
        let delivery = document.createElement('td');
        restaurant.highlights.includes('Delivery') ? (delivery.textContent = 'true') : (delivery.textContent = 'false');
        let outdoorSeating = document.createElement('td');
        restaurant.highlights.includes('Outdoor Seating') ? (outdoorSeating.textContent = 'true') : (outdoorSeating.textContent = 'false');

        tr.appendChild(name);
        tr.appendChild(phone);
        tr.appendChild(delivery);
        tr.appendChild(outdoorSeating);
        tbody.appendChild(tr);
      });
    });
}

function getRestaurantReviews() {
  res_id = 16615034;
  axios
    .get(`${endpoint}/reviews?user-key=&res_id=${res_id}`, {
      headers: headers,
    })
    .then(response => console.log(response));
}

// getRestaurantReviews();
