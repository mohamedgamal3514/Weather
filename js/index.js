// Adding and removing active calss from navLinks.
let navLinks = document.querySelectorAll("ul li a");
//console.log(navLinks);
navLinks.forEach(ele => {
	ele.addEventListener("click", function () {
		document.querySelector(".active_link").classList.remove("active_link")
		ele.classList.add("active_link")
	})
});

//Html Elements
let searchInput = document.getElementById("searchInput");
let cityName = document.getElementById("cityName");
let currentDay = document.getElementById("currentDay");
let cDegree = document.getElementById("cDegree");
let caseImage = document.getElementById("caseImage");
let cHumidity = document.getElementById("cHumidity");
let dayCondition = document.getElementById("dayCondition");
let windSpeed = document.getElementById("windSpeed");
let windDir = document.getElementById("windDir");
let nextDay = document.getElementById("nextDay");
let nextDayCondIcon = document.getElementById("nextDayCondIcon")
let nextDayCondition = document.getElementById("nextDayCondition");
let thirdDayDegree = document.getElementById("thirdDayDegree");
let thirdConditionIcon = document.getElementById("thirdConditionIcon");
let thirdConditionText = document.getElementById("thirdConditionText");
let dayDate = document.getElementById("dayDate");
let currentDate = document.getElementById("currentDate");
let currentDayName = document.getElementById("currentDayName");
let nextDayName = document.getElementById("nextDayName");
let thidDayName = document.getElementById("thidDayName");


// Fetching Data
let data = [];
async function getDate(c) {
	let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1a1787df9ed24ecfb6791632240104&q=${c}&days=3`);
	data = await response.json();
	displayData(data);
}
getDate("Doha");



let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();


// Display Dynamic Data in the three days
function displayData(data) {
	//current day
	cityName.innerHTML = `${data.location.name}`;
	currentDate.innerHTML = `${d.getDate()} ${month[d.getMonth()]}`
	currentDayName.innerHTML = `${days[d.getDay()]}`
	cDegree.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
	caseImage.setAttribute("src", `https:${data.current.condition.icon}`);
	cHumidity.innerHTML = `${data.current.humidity}`;
	dayCondition.innerHTML = `${data.current.condition.text}`
	windSpeed.innerHTML = `${data.current.wind_kph}Kph`
	windDir.innerHTML = `${data.current.wind_dir}`
	//second day
	nextDayName.innerHTML = `${days[new Date(data.forecast.forecastday[1].date.replace(" ", "T")).getDay()]}`
	nextDay.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
	nextDayCondIcon.setAttribute("src", `https:${data.forecast.forecastday[1].day.condition.icon}`)
	nextDayCondition.innerHTML = `${data.forecast.forecastday[1].day.condition.text}`
	//third day
	thidDayName.innerHTML = `${days[new Date(data.forecast.forecastday[2].date.replace(" ", "T")).getDay()]}`
	thirdDayDegree.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
	thirdConditionIcon.setAttribute("src", `https:${data.forecast.forecastday[2].day.condition.icon}`)
	thirdConditionText.innerHTML = `${data.forecast.forecastday[2].day.condition.text}`
};


// Handle searchinput
searchInput.addEventListener("input", (e) => {
	getDate(e.target.value)
})

