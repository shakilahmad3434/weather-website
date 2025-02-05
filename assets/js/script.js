//global variables
let dateIndex = "2024-11-29";
let icons = "http://cdn.weatherapi.com/weather/64x64/night/113.png";
let weatherName = "overcast clouds";
const cityName = document.querySelector(".header_search");
const cityLocation = document.querySelector(".city_location");
const weatherCondition = document.querySelector(".weather_condition");
const airQualityPM = document.querySelector(".air_quality-pm");
const airQualitySO2 = document.querySelector(".air_quality-so2");
const airQualityNO2 = document.querySelector(".air_quality-no2");
const airQualityO3 = document.querySelector(".air_quality-o3");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const feelsLike = document.querySelector(".feels-like");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const addCountry = document.querySelector(".country_add");
const parentCountry = document.querySelector(".country_showing");

// set up today date & time and show top right corner
const date = document.querySelector(".today_date");
const month = document.querySelector(".today_month");
const week = document.querySelector(".today_week");
const numberToMonthConverter = (num) => {
  let month;
  switch (num) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }
  return month;
};
const numberToWeekConverter = (num) => {
  let day;
  switch (num) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thur";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
  }
  return day;
};
const todayDate = new Date();
date.innerHTML = todayDate.getDate();
month.innerHTML = numberToMonthConverter(todayDate.getMonth());
week.innerHTML = numberToWeekConverter(todayDate.getDay());

// fetch user city automatically with third party api

const fetchUserLocation = async () => {
  try {
    const token = "92a388cbad8be3";
    const thirdPartyAPI = `https://ipinfo.io/json?token=${token}`;

    const res = await fetch(thirdPartyAPI);

    const data = await res.json();
    return data.city;
  } catch (error) {
    return 0;
  }
};

//fetch and display data from API

const forecastApi = async (city_input) => {
  let currentCity = (await fetchUserLocation()) || "Pune";
  let city = city_input || currentCity;
  const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=42704489c98141a4a6f172729242811&q=${city}&days=10&aqi=yes&alerts=no`;
  try {
    const res = await fetch(weatherApi);
    const data = await res.json();
    weatherCondition.innerHTML = data.current.condition.text;
    let airQualityIndex = data.current.air_quality;
    cityLocation.innerHTML = data.location.name;
    airQualityPM.innerHTML = airQualityIndex.pm2_5;
    airQualitySO2.innerHTML = airQualityIndex.so2;
    airQualityNO2.innerHTML = airQualityIndex.no2;
    airQualityO3.innerHTML = airQualityIndex.o3;
    sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
    sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;
    humidity.innerHTML = data.current.humidity;
    pressure.innerHTML = data.current.pressure_mb;
    visibility.innerHTML = data.current.vis_km;
    feelsLike.innerHTML = data.current.feelslike_c;

    // create and display today forecast by every hour

    const todayForcastDetails = document.querySelector(".today_forecast-hour");
    for (let i = 0; i < 24; i++) {
      let hourForecast =
        i === 0
          ? `12 AM`
          : i === 12
          ? `12 PM`
          : `${i % 12 || 12} ${i < 12 ? "AM" : "PM"}`;

          todayForcastDetails.innerHTML += `<div class="today_forecast-item">
                <div class="forecast_item-weather">
                    <div class="forecast_item-icon">
                        <img src="http:${data.forecast.forecastday[0].hour[i].condition.icon}">
                    </div>
                    <div class="forecast_item-hour">
                        <span class="forecast_hour">${hourForecast}</span>
                        <p class="forecast_text">${data.forecast.forecastday[0].hour[i].condition.text}</p>
                    </div>
                </div>
                <div class="forecast_item-temp">
                    <div class="forecast_temp-c">
                        <h2>${data.forecast.forecastday[0].hour[i].feelslike_c} <sup>°C</sup></h2>
                    </div>
                    <div class="forecast_temp-air">
                        <span>Wind: ${data.forecast.forecastday[0].hour[i].wind_kph}km</span>
                        <span>Humidity: ${data.forecast.forecastday[0].hour[i].humidity}%</span>
                    </div>
                </div>
            </div>`;
    }

    // create and display tomorrow forcast by every hour
    const tomorrowForcastDetails = document.querySelector(".tomorrow_forecast-hour");
    for (let i = 0; i < 24; i++) {
        let hourForecast =
          i === 0
            ? `12 AM`
            : i === 12
            ? `12 PM`
            : `${i % 12 || 12} ${i < 12 ? "AM" : "PM"}`;
  
            tomorrowForcastDetails.innerHTML += `<div class="today_forecast-item">
                  <div class="forecast_item-weather">
                      <div class="forecast_item-icon">
                          <img src="http:${data.forecast.forecastday[1].hour[i].condition.icon}">
                      </div>
                      <div class="forecast_item-hour">
                          <span class="forecast_hour">${hourForecast}</span>
                          <p class="forecast_text">${data.forecast.forecastday[1].hour[i].condition.text}</p>
                      </div>
                  </div>
                  <div class="forecast_item-temp">
                      <div class="forecast_temp-c">
                          <h2>${data.forecast.forecastday[1].hour[i].feelslike_c} <sup>°C</sup></h2>
                      </div>
                      <div class="forecast_temp-air">
                          <span>Wind: ${data.forecast.forecastday[1].hour[i].wind_kph}km</span>
                          <span>Humidity: ${data.forecast.forecastday[1].hour[i].humidity}%</span>
                      </div>
                  </div>
              </div>`;
      }

      // create and display 7 days forcast by days not hour
      const sevenDaysForcastDetails = document.querySelector(".sevendays_forecast");
      for(let y = 0; y < 7; y++){
        const sevenDaysDate = new Date(data.forecast.forecastday[y].date);
        sevenDaysForcastDetails.innerHTML +=`<div class="days_forecast-item">
              <div class="days_forecast-temp">
                <img
                  src="http:${data.forecast.forecastday[y].day.condition.icon}"
                />
                <h2>${data.forecast.forecastday[y].day.avgtemp_c}°</h2>
              </div>
              <div class="days_forecast-date">
                <h2><span>${sevenDaysDate.getDate()}</span> <sub><span>${numberToMonthConverter(sevenDaysDate.getMonth())}</span>, <span>${numberToWeekConverter(sevenDaysDate.getDay())}</span></sub></h2>
              </div>
            </div>`;
        
      }

      // create 10 days forcast by days and display
      const tenDaysForcastDetails = document.querySelector(".fifteendays_forecast");
      for(let z = 0; z < 10; z++){
        const sevenDaysDate = new Date(data.forecast.forecastday[z].date);
        tenDaysForcastDetails.innerHTML +=`<div class="days_forecast-item">
              <div class="days_forecast-temp">
                <img
                  src="http:${data.forecast.forecastday[z].day.condition.icon}"
                />
                <h2>${data.forecast.forecastday[z].day.avgtemp_c}°</h2>
              </div>
              <div class="days_forecast-date">
                <h2><span>${sevenDaysDate.getDate()}</span> <sub><span>${numberToMonthConverter(sevenDaysDate.getMonth())}</span>, <span>${numberToWeekConverter(sevenDaysDate.getDay())}</span></sub></h2>
              </div>
            </div>`;
        
      }

    // create a funtion to give neighbor country

    const findNeighbor = async (countryName) => {
      try {
        const api = `https://restcountries.com/v3.1/name/${countryName}`;
        const res = await fetch(api);
        const data = await res.json();
        const neighborsCodes = data[0]?.borders;

        if (!neighborsCodes) {
          // console.log(`No neighboring countries found for ${countryName}.`);
          return [];
        }

        // Fetch full details of neighboring countries
        const neighborPromises = neighborsCodes.map(async (code) => {
          const fullCountry = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}`
          );
          const fullCountryRes = await fullCountry.json();
          return {
            name: fullCountryRes[0]?.name?.common || "Unknown",
            capital: fullCountryRes[0]?.capital
              ? fullCountryRes[0].capital[0]
              : "No capital",
          };
        });

        const fullCountryArr = await Promise.all(neighborPromises);
        return fullCountryArr;
      } catch (error) {
        console.error("Error fetching data:", error.message);
        return [];
      }
    };

    // Function to dynamically create country cards
    const createCountry = async () => {
      const neighborArr = await findNeighbor(data.location.country);

      if (!parentCountry) {
        console.error("Parent element not found!");
        return;
      }

      neighborArr.forEach(async (country) => {
        const newCapitalRes = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=42704489c98141a4a6f172729242811&q=${country.capital}&days=7&aqi=yes&alerts=no`
        );
        const newCapitalData = await newCapitalRes.json();
        parentCountry.innerHTML += `
            <div class="country_item">
                <div class="country_item-icon">
                    <img src="http:${newCapitalData.current.condition.icon}">
                </div>
                <div>
                    <p>${country.name}</p>
                    <span>${country.capital}</span>
                </div>
                <div>
                    <h2>${newCapitalData.current.feelslike_c}°C</h2>
                </div>
            </div>`;
      });
    };

    // Call the function to render neighboring countries
    createCountry();

    // console.log(data);
  } catch (error) {
    // alert(`City is Wrong: ${city} \n please write a right city name`);
  }
};

forecastApi();

// add new country
const addNewCountry = async () => {
  const userInput = prompt("Please enter your name:");

  if (userInput && userInput.trim()) {
    const trimmedInput = userInput.trim();

    try {
      // Fetch data from API
      const addNewCountryRes = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=42704489c98141a4a6f172729242811&q=${trimmedInput}&days=7&aqi=yes&alerts=no`
      );

      // Check if response is ok (status 200-299)
      if (!addNewCountryRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const addNewCountryData = await addNewCountryRes.json();

      // Check if the returned JSON contains valid data
      if (addNewCountryData && addNewCountryData.location) {
        // console.log(addNewCountryData);
        // Update the UI with the fetched data
        parentCountry.innerHTML += `
                    <div class="country_item">
                <div class="country_item-icon">
                    <img src="http:${addNewCountryData.current.condition.icon}">
                </div>
                <div>
                    <p>${addNewCountryData.location.name}</p>
                    <span>${addNewCountryData.location.country}</span>
                </div>
                <div>
                    <h2>${addNewCountryData.current.feelslike_c}°C</h2>
                </div>
            </div>`;
      } else {
        console.log("Invalid or missing data in API response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    console.log("No input provided.");
  }
};

const cityHandle = (e) => {
  e.preventDefault();
  const cityInput = e.target.querySelector('input[name="city"]').value;
  forecastApi(cityInput.trim());
  // console.log(cityInput);
  e.target.querySelector('input[name="city"]').value = "";
};

cityName.addEventListener("submit", cityHandle);

addCountry.addEventListener("click", addNewCountry);

const tabsOnOff = (e) => {
  if (e.target.tagName === "BUTTON") {
    // Check if the clicked element is a <button>
    // const btnHTML = `<button class="tomorrow_btn">Tomorrow</button>`;
    if (e.target.innerHTML === "Today") {
      document.querySelector(".fifteendays_btn").classList.remove("active");
      document.querySelector(".sevendays_btn").classList.remove("active");
      document.querySelector(".tomorrow_btn").classList.remove("active");
      document.querySelector(".today_btn").classList.add("active");

      document.querySelector(".today_forecast-hour").style.display = "block";
      document.querySelector(".tomorrow_forecast-hour").style.display = "none";
      document.querySelector(".sevendays_forecast").style.display = "none";
      document.querySelector(".fifteendays_forecast").style.display = "none";
    } else if (e.target.innerHTML === "Tomorrow") {
      document.querySelector(".fifteendays_btn").classList.remove("active");
      document.querySelector(".sevendays_btn").classList.remove("active");
      document.querySelector(".tomorrow_btn").classList.add("active");
      document.querySelector(".today_btn").classList.remove("active");

      document.querySelector(".today_forecast-hour").style.display = "none";
      document.querySelector(".tomorrow_forecast-hour").style.display = "block";
      document.querySelector(".sevendays_forecast").style.display = "none";
      document.querySelector(".fifteendays_forecast").style.display = "none";
    } else if (e.target.innerHTML === "7 Days") {
      document.querySelector(".fifteendays_btn").classList.remove("active");
      document.querySelector(".sevendays_btn").classList.add("active");
      document.querySelector(".tomorrow_btn").classList.remove("active");
      document.querySelector(".today_btn").classList.remove("active");

      document.querySelector(".today_forecast-hour").style.display = "none";
      document.querySelector(".tomorrow_forecast-hour").style.display = "none";
      document.querySelector(".sevendays_forecast").style.display = "block";
      document.querySelector(".fifteendays_forecast").style.display = "none";
    } else if (e.target.innerHTML === "15 Days") {
      document.querySelector(".fifteendays_btn").classList.add("active");
      document.querySelector(".sevendays_btn").classList.remove("active");
      document.querySelector(".tomorrow_btn").classList.remove("active");
      document.querySelector(".today_btn").classList.remove("active");

      document.querySelector(".today_forecast-hour").style.display = "none";
      document.querySelector(".tomorrow_forecast-hour").style.display = "none";
      document.querySelector(".sevendays_forecast").style.display = "none";
      document.querySelector(".fifteendays_forecast").style.display = "block";
    }
  } else {
    console.log("Not a button, no action taken.");
  }
};

document
  .querySelector(".forecast_tabs-link")
  .addEventListener("click", tabsOnOff);
