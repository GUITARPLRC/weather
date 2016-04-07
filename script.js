$(function(){
	
	var convertC = $("convertC");
	var convertF = $("convertF");
	var symbol = $("symbol"); // for weather symbol
	var displayTemp = $("temperature");
	var message = $("message");
	var myCity = $("myCity");
	var city; // store city name
	var tempNow; // store temp value
	var latitude; // store latitude location
	var longitude; // store longitude location
	var descript; // to convert from symbol use
	var myLocation; // store location info
	
	convertC.click(convertCel);
	convertF.click(convertFah);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			lat = position.coords.latitude;
			long = position.coords.longitude;
			myLocation = "lat="+lat+"&lon="+long;
		})
	} else {
		myLocation = "q=england";
	}
	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?" + location + "&appid=0e61c9d5e0a1848bbb9d99132298b339", function(info){
		
		console.log(info["coord"]);
		tempNow = info.main.temp;
		city = info.name;
		descript = info.weather[0].description;
		
		if ((info.weather[0].description).indexOf("rain")) {
			$("body").css("background-image", "url(rainy.jpg)");
			
		} else if ((info.weather[0].description).indexOf("snow")) {
			$("body").css("background-image", "url(snowy.jpg)");
			
		} else {
			$("body").css("background-image", "url(sunny.jpg)");
			
		}
		
  });

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

	myCity.textContent = city;
	message.textContent = descript;
	convertF.click;
	
	
});