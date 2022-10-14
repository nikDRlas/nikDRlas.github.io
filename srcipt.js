const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8447736145mshf4cb2232f154b48p1bc959jsn8821fc14341c",
    "X-RapidAPI-Host": "restaurants-api.p.rapidapi.com",
  },
};

// async function getLatAndLong() {
//   const fetchMaps = await fetch(
//     "https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=AIzaSyAgI13DNbLZ9IrzO7iHXO3EwR8qqyKWDGI"
//   );

//   const json = await fetchMaps.json();
//   const resultsMap = json.results;

//   //   console.log(results[0].geometry.location);

//   const longitude = resultsMap[0].geometry.location.lng;
//   const latitude = resultsMap[0].geometry.location.lat;
//   const radius = 1000;
//   const attendees = "glutenfree";

//   return longitude, latitude, attendees, radius;
// }
// addresse.onkeyup = function () {
//   let streetV = addresse.value;
// };

// console.log(streetV);

const getData = async function () {
  // Getting data from form
  const addresse = document.querySelector("#addresse").value;
  // let streetV = addresse.onkeyup.value;

  // Getting Long and Lat
  const fetchMaps = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addresse}&key=AIzaSyAgI13DNbLZ9IrzO7iHXO3EwR8qqyKWDGI`
  );

  const json = await fetchMaps.json();
  const resultsMap = json.results;

  //   console.log(results[0].geometry.location);

  const longitude = resultsMap[0].geometry.location.lng;
  const latitude = resultsMap[0].geometry.location.lat;
  const radius = 1000;
  const attendees = "";
  console.log("long", longitude, "lat", latitude);
  //Getting restaurants
  const response = await fetch(
    `https://restaurants-api.p.rapidapi.com/restaurants?latitude=${latitude}&longitude=${longitude}&radius=${radius}&attendees=${attendees}`,
    options
  );

  const data = await response.json();
  const results = data.data.results;
  console.log(results);

  // Creating restaurants cards
  const restContainer = document.createElement("div");
  restContainer.classList.add("restContainer");
  const body = document.querySelector("body");
  body.append(restContainer);

  results.forEach((result) => {
    const rest = document.createElement("div");
    const restName = document.createElement("h2");
    const restPrice = document.createElement("p");
    const restLoca = document.createElement("p");
    const restOpen = document.createElement("p");
    const googleMap = document.createElement("a");

    rest.classList.add("restCard");

    restName.textContent = result.name;
    rest.append(restName);

    if (result.opening_hours.open_now) {
      restOpen.textContent = `Restaurant is open!`;
    } else {
      restOpen.textContent = `Restaurant is closed!`;
    }
    rest.append(restOpen);

    restLoca.textContent = `Adresse: ${result.vicinity}`;
    rest.append(restLoca);

    googleMap.textContent = "Click here and find me on Google";
    googleMap.href = `http://google.com/search?q=${result.name}`;

    if (result.price_level) {
      restPrice.textContent = `Price categorie: ${result.price_level} of 4. 0 = Cheap, 4 = Expensiv`;
    } else {
      restPrice.textContent = "No pricing information avaliable";
    }
    rest.append(restPrice);

    rest.append(googleMap);

    restContainer.append(rest);
  });
};

document.addEventListener("submit", (e) => {
  e.preventDefault();
  getData();
});
