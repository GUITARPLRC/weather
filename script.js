var container = document.getElementById("container");
var displayTemp = document.getElementById("temperature");
var message = document.getElementById("message");
var myCity = document.getElementById("myCity");
var icon = document.getElementById("icon");
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
    icon.setAttribute("src", "http://openweathermap.org/img/w/"+ info.weather[0].icon +".png")
		
    switch (info.weather[0].icon) {
      
      case "02d": // CLOUDY
      case "04d":
      case "03d":
        $("body").css("background-image", "url(cloudy-field.jpg)");
        break;
      case "02n":
      case "03n":
      case "04n":
        $("body").css("background-image", "url(cloudy-sunset.jpg)");
        break;
      case "09d": // RAIN
      case "10d":
        $("body").css("background-image", "url(rainy.jpg)");
        break;
      case "10n":
      case "09n":
        $("body").css("background-image", "url(rain-glass.jpe)");
        break;
      case "11d": // THUNDERSTORM
				$("body").css("background-image", "url(lightning-storm.jpg)");
				break;
      case "11n":
        $("body").css("background-image", "url(stormy-beach.jpg)");
        break;
      case "13d": // SNOW
      case "13n":
        $("body").css("background-image", "url(snowy.jpg)");
        break;
      case "50d": // MIST / FOG
				$("body").css("background-image", "url(fog-day.jpeg)");
				break;
      case "50n":
				$("body").css("background-image", "url(fog-night.jpeg)")
        break;
			case "01d": // CLEAR SKY
				$("body").css("background-image", "url(sunny.jpg)");
				break;
			case "01n":
				$("body").css("background-image", "url(star-night.jpg)");
				break;
      default: // CLEAR SKY
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