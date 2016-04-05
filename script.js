$(function(){
	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Schaumburg,IL&APPID=0e61c9d5e0a1848bbb9d99132298b339",function(result){
		
		temp = result.main.temp;
		convertFah.click;
		
		if ((result.weather[0].description).indexOf("rain")) {
			$("body").css("background-image", "rainy.jpg");
		} else if ((result.weather[0].description).indexOf("snow")) {
			$("body").css("background-image", "snowy.jpg");
		} else {
			$("body").css("background-image", "sunny.jpg");
		}
		
  });
	
});

var convertC = document.getElementById("convertC");
var convertF = document.getElementById("convertF");
var symbol = document.getElementById("symbol"); // for weather symbol
var displayTemp = document.getElementById("temp");
var city;
var weather;
var temp;
var descript; // to convert from symbol use

convertC.addEventListener("click", convertCel, false);
convertF.addEventListener("click", convertFah, false);

function convertCel() {
	var cTemp; // temporary to hold celsius value
	convertC.style.visibility = "hidden";
	convertF.style.visibility = "visible";
	cTemp = (temp - 273.15).toFixed(2);
	displayTemp.textContent = cTemp + "&degC";
}

function convertFah() {
	var fTemp; // temporary to hold fahrenheit value
	convertF.style.visibility = "hidden";
	convertC.style.visibility = "visible";
	fTemp = (1.8 * (temp - 273) + 32).toFixed(2);
	displayTemp.textContent = fTemp + "&degF";
}