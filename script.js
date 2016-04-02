$(function(){
	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Schaumburg,IL&APPID=0e61c9d5e0a1848bbb9d99132298b339",function(result){
		
		var temp = result.main.temp;
		
    document.write("City: "+ result.name + "<br />");
    document.write("Weather: "+ result.weather[0].description + "<br />");
		document.write((temp - 273.15).toFixed(2) + "C" + "<br />");
		document.write(((1.8*(temp - 273))+32).toFixed(2) + "F" + "<br />");
		document.write(temp + "K");
  });
	
});

var weatherData;
var getIt = document.getElementById("getIt");
var convertC = document.getElementById("convertC");
var convertF = document.getElementById("convertF");
var temp;

getIt.addEventListener("click", gettingJSON, false);
convertC.addEventListener("click", convertCel, false);
convertF.addEventListener("click", convertFah, false);


function gettingJSON(){
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=0e61c9d5e0a1848bbb9d99132298b339", function(a) {
		temp = (a.main.temp);
	});
}

function convertCel() {
	temp = temp - 273.15;
}

function convertFah() {
	temp = 1.8 * (temp - 273) + 32;
}