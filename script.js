var container = document.getElementById('container');
var displayTemp = document.getElementById('temperature');
var message = document.getElementById('message');
var myCity = document.getElementById('myCity');
var icon = document.getElementById('icon');
var myLocation; // store location info
var myLat;
var myLong;
var tempNow;
var check = 0;

container.addEventListener(
	'click',
	function() {
		if (check === 0) {
			convertFah();
		} else {
			convertCel();
		}
	},
	false
);

if (window) {
	$.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCM9hJnkNSXPlbg3XF-HRPTxzXpQUzhJiw', function(
		data
	) {
		myLat = data.location.lat.toFixed(2);
		myLong = data.location.lng.toFixed(2);
		myLocation = 'lat=' + myLat + '&lon=' + myLong;
	}).done(function() {
		getWeather();
	});
} else {
	myLocation = 'q=london,uk';
	getWeather();
}

function getWeather() {
	$.getJSON(
		'https://api.openweathermap.org/data/2.5/weather?' + myLocation + '&APPID=0e61c9d5e0a1848bbb9d99132298b339',
		function(info) {
			tempNow = info.main.temp;
			myCity.textContent = info.name;
			message.textContent = info.weather[0].description;
			icon.setAttribute('src', 'https://openweathermap.org/img/w/' + info.weather[0].icon + '.png');

			switch (info.weather[0].icon) {
				case '02d': // CLOUDY
				case '04d':
				case '03d':
				case '02n':
				case '03n':
				case '04n':
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=1056")');
					break;
				case '09d': // RAIN
				case '10d':
				case '10n':
				case '09n':
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=680")');
					break;
				case '11d': // THUNDERSTORM
				case '11n':
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=542")');
					break;
				case '13d': // SNOW
				case '13n':
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=905")');
					break;
				case '50d': // MIST / FOG
				case '50n':
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=1045")');
					break;
				case '01d': // CLEAR SKY
				case '01n':
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=986")');
					break;
				default:
					// CLEAR SKY
					$('body').css('background-image', 'url("https://unsplash.it/1920/1080?image=1026")');
			}

			convertFah();
		}
	);
}

function convertCel() {
	check = 0;
	var cTemp; // temporary to hold celsius value
	cTemp = Math.round(tempNow - 273.15);
	if (isNaN(cTemp)) {
		displayTemp.textContent = 'Sorry can not see your location';
	} else {
		displayTemp.textContent = cTemp + '\u00B0C'; //display temp value and add degree
	}
}

function convertFah() {
	check = 1;
	var fTemp; // temporary to hold fahrenheit value
	fTemp = Math.round(1.8 * (tempNow - 273) + 32);
	if (isNaN(fTemp)) {
		displayTemp.textContent = 'Sorry can not see your location';
	} else {
		displayTemp.textContent = fTemp + '\u00B0F'; //display temp value and add degree
	}
}
