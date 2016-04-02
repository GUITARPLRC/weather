$(function(){
	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Schaumburg,IL&APPID=0e61c9d5e0a1848bbb9d99132298b339",function(result){
		
		var temp = result.main.temp;
		
    document.write("City: "+ result.name + "<br />");
    document.write("Weather: "+ result.weather[0].description + "<br />");
		document.write((temp - 273.15).toFixed(2) + "&degC" + "<br />");
		document.write(((1.8*(temp - 273))+32).toFixed(2) + "&degF" + "<br />");
		document.write(temp + "&degK");
		
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
var temp;
var descript; // to convert from symbol use

convertC.addEventListener("click", convertCel, false);
convertF.addEventListener("click", convertFah, false);


function gettingJSON(){
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=0e61c9d5e0a1848bbb9d99132298b339", function(a) {
		
		temp = a.main.temp;
		descript = a.weather[0].description;
		
	});
}

function convertCel() {
	temp = temp - 273.15;
}

function convertFah() {
	temp = 1.8 * (temp - 273) + 32;
}