const currentDayDOM = document.getElementById("currentDay");
const API_KEY = "3d276dd0248a8f6d4a15500dc0dec11a";

let state = {
  humidity: "",
  city: "",
  country: "",
  temp: "",
  days: [],
  icon: "",
  description: "",
};
function setState(data) {
  state = { ...state, ...data };
  renderCurrentDay();
}
function getDayOfWeek(date) {
  const dayOfWeek = new Date(date);
  return dayOfWeek.getDay();
}
function GetDay() {
  const d = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  const weekDayName = weekday[d.getDay()];
  return weekDayName;
}
async function handleFetchData() {
  const city = document.getElementById("city").value;
  console.log("city", city);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&units=metric&APPID=${API_KEY}`;
  const response = await fetch(url);
  data = await response.json();
  setState({
    temp: data.list[0].main.temp,
    country: data.city.country,
    city: data.city.name,
    week: data.list,
    humidity: data.list[0].main.humidity,
    days: [
      data.list[0],
      data.list[8],
      data.list[16],
      data.list[24],
      data.list[32],
    ],
    icon: data.list[0].weather[0].icon,
    description: data.list[0].weather[0].description,
  });
  renderCurrentDay();
}

function renderCurrentDay() {
  const result = state.days.map((day) =>
    renderListElement({
      date: day.dt_txt,
      minTemp: day.main.temp_min,
      maxTemp: day.main.temp_max,
      icon: day.weather[0].icon,
    })
  );
  const _html = `
    <div class="currentday_container row">
    <div class="currentday_informations" >
    <h4>${state.city}</h4>
   <div className="row">
   <span className="font-weight-bold">${GetDay()}</span>
   <span className="text-capitalize">${state.description}</span>
  
    </div> 
    <span>Humidity: ${state.humidity}%</span> 
    </div>
    <div class="icon_container">  
    <img class="icon_weather" src="http://openweathermap.org/img/wn/${
      state.icon
    }@2x.png" alt="weather_icon" >
    <span class="currentday_temp font-weight-bold">
    ${state.temp}
    </span>
    </div>
    </div>
   <div> 
    `;
  currentDayDOM.innerHTML = _html;
  const listDOM = document.getElementById("list");
  result.forEach(
    (listItem) => (listDOM.innerHTML = listDOM.innerHTML + listItem)
  );
}

function renderListElement({ date, minTemp, maxTemp, icon }) {
  return `
<div class="row list_element">
<span class="list_item">${date.substring(0, 10)}</span>
<span class="list_item">${minTemp}</span>
<span class="list_item">${maxTemp}</span>
<img src="http://openweathermap.org/img/wn/${icon}@2x.png"
</div>
`;
}
