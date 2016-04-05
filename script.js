$(function(){
	
	var convertC = document.getElementById("convertC");
	var convertF = document.getElementById("convertF");
	var symbol = document.getElementById("symbol"); // for weather symbol
	var displayTemp = document.getElementById("temp");
	var message = document.getElementById("message");
	var myCity = document.getElementById("myCity");
	var city;
	var weather;
	var temp;
	var descript; // to convert from symbol use
	var latitude;
	var longitude;
	
	function storePosition(position) {
		latitude = (position.coords.latitude).toFixed(2);
		longitude = (position.coords.longitude).toFixed(2);
	}
	
	navigator.geolocation.getCurrentPosition(storePosition); // get local coordinates
	
	console.log(latitude);
	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=0e61c9d5e0a1848bbb9d99132298b339",function(result){
		
		temp = result.main.temp;
		city = result.name;
		descript = result.weather[0].description;
		
		if ((result.weather[0].description).indexOf("rain")) {
			$("body").css("background-image", "url(rainy.jpg)");
			
		} else if ((result.weather[0].description).indexOf("snow")) {
			$("body").css("background-image", "url(snowy.jpg)");
			
		} else {
			$("body").css("background-image", "url(sunny.jpg)");
			
		}
		
  });
	
	convertC.addEventListener("click", convertCel, false);
	convertF.addEventListener("click", convertFah, false);

	function convertCel() {
		var cTemp; // temporary to hold celsius value
		convertC.style.visibility = "hidden";
		convertF.style.visibility = "visible";
		cTemp = (temp - 273.15).toFixed(2);
		displayTemp.textContent = cTemp + "\u00B0C"; //display temp value and add degree
	}

	function convertFah() {
		var fTemp; // temporary to hold fahrenheit value
		convertF.style.visibility = "hidden";
		convertC.style.visibility = "visible";
		fTemp = (1.8 * (temp - 273) + 32).toFixed(2);
		displayTemp.textContent = fTemp + "\u00B0F"; //display temp value and add degree
	}

	myCity.textContent = city;
	message.textContent = descript;
	convertF.click();
	
	
});