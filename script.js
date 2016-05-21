var container = document.getElementById("container");
var displayTemp = document.getElementById("temperature");
var message = document.getElementById("message");
var myCity = document.getElementById("myCity");
var myLocation; // store location info
var myLat;
var myLong;
var tempNow;
var check = 0;

container.addEventListener("click", function() {
	if (check === 0) {
		convertFah();
	} else {
		convertCel();
	}
}, false);

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    myLat = (position.coords.latitude).toFixed(2);
    myLong = (position.coords.longitude).toFixed(2);
    myLocation = "lat=" + myLat + "&lon=" + myLong;
    getWeather();
  });
} else {
  myLocation = "q=london,uk";
  getWeather();
}

function getWeather() {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?" + myLocation + "&appid=0e61c9d5e0a1848bbb9d99132298b339", function(info) {

    tempNow = info.main.temp;
    myCity.textContent = info.name;
    message.textContent = info.weather[0].description;

<<<<<<< HEAD
    if ((info.weather[0].main).indexOf("rain") > -1 || (info.weather[0].main).indexOf("storm") > -1) {
      $("body").css("background-image", "url(rainy.jpg)");

    } else if ((info.weather[0].main).indexOf("snow") > -1 || (info.weather[0].main).indexOf("sleet") > -1) {
=======
    if ((info.weather[0].main).indexOf("rain") >= 0 || (info.weather[0].main).indexOf("storm") >= 0) {
      $("body").css("background-image", "url(rainy.jpg)");

    } else if ((info.weather[0].main).indexOf("snow") >= 0 || (info.weather[0].main).indexOf("flurries") >= 0) {
>>>>>>> origin/master
      $("body").css("background-image", "url(snowy.jpg)");

    } else if ((info.weather[0].main).indexOf("cloud") > -1 || (info.weather[0].main).indexOf("sleet") > -1) {
      $("body").css("background-image", "url(cloudy.jpg)");

    } else {
      $("body").css("background-image", "url(sunny.jpg)");

    }
		
		convertFah();

  });
}

function convertCel() {
	check = 0;
  var cTemp; // temporary to hold celsius value
  cTemp = Math.round(tempNow - 273.15);
  displayTemp.textContent = cTemp + "\u00B0C"; //display temp value and add degree
}

function convertFah() {
	check = 1;
  var fTemp; // temporary to hold fahrenheit value
  fTemp = Math.round(1.8 * (tempNow - 273) + 32);
  displayTemp.textContent = fTemp + "\u00B0F"; //display temp value and add degree
}