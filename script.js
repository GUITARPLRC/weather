var convertC = document.getElementById("convertC");
var convertF = document.getElementById("convertF");
var displayTemp = document.getElementById("temperature");
var message = document.getElementById("message");
var myCity = document.getElementById("myCity");
var descript; // to convert from symbol use
var myLocation; // store location info
var myLat;
var myLong;
var tempNow;

convertC.addEventListener("click", convertCel, false);
convertF.addEventListener("click", convertFah, false);

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

    if ((info.weather[0].description).indexOf("rain")) {
      $("body").css("background-image", "url(rainy.jpg)");

    } else if ((info.weather[0].description).indexOf("snow")) {
      $("body").css("background-image", "url(snowy.jpg)");

    } else {
      $("body").css("background-image", "url(sunny.jpg)");

    }
		
		convertFah();

  });
}

function convertCel() {
  var cTemp; // temporary to hold celsius value
  convertC.style.visibility = "hidden";
  convertF.style.visibility = "visible";
  cTemp = (tempNow - 273.15).toFixed(2);
  displayTemp.textContent = cTemp + "\u00B0C"; //display temp value and add degree
}

function convertFah() {
  var fTemp; // temporary to hold fahrenheit value
  convertF.style.visibility = "hidden";
  convertC.style.visibility = "visible";
  fTemp = (1.8 * (tempNow - 273) + 32).toFixed(2);
  displayTemp.textContent = fTemp + "\u00B0F"; //display temp value and add degree
}