/* --------------------------------------------------------- *
 * We will be using Open Weather API for showing weather *
 * Documentation: https://openweathermap.org/current         *
 * --------------------------------------------------------- */

var api       = "http://api.openweathermap.org/data/2.5/weather?",
	appid     = "appid=e0b01df8d539332186b67b9610fdd7b2",
	temp      = $("#temp"),
	indicator = $("#indicator"),
	city      = $("#city"),
	sunRise   = $("#sun-rise"),
	sunSet    = $("#sun-set");

// Getting Location
$(document).ready(function($) {

	$.ajax({
		url: 'http://ipinfo.io/',
		dataType: 'json',
	})

	.done(function (data) {
		var geoData = data;		// Storing response from ipinfo.com
		getWeather(geoData);	// Calling getWeather function
	});
		
});


// Getting current weather status
function getWeather(geoData) {

	var cityData 	= geoData.city,											// City
		location	= "lat=" + geoData.loc.replace(",", "&lon="),			// geoLocation
		apiuri 		= api + location + "&" + "units=metric" + "&" + appid;	// Generating url for api
		
	$.ajax({
		url: apiuri,
		dataType: 'json',
	})

	.done(function(data) {
		var weatherData = data;		// Storing Response From open weathermap api
		updateWeather(weatherData, cityData); // Calling updateWeather function
	});
	
};


// Updateing weather
function updateWeather(weatherData, cityData) {

	var tempData 	= Math.round(weatherData.main.temp),							// Tempareture
		sunRiseTime = new Date(weatherData.sys.sunrise*1000).toLocaleTimeString(),	// Sun Rise Time
		sunSetTime 	= new Date(weatherData.sys.sunset*1000).toLocaleTimeString(),	// Sun Set Time
		weatherId 	= (weatherData.weather[0].id);

	// Manipulating DOM
	temp.text(tempData);
	indicator.text("°C");
	city.text(cityData);
	sunRise.text(sunRiseTime);
	sunSet.text(sunSetTime);

	genarateIcon(weatherId); // Calling genarateIcon Function
	
};


// Genarate Icon
function genarateIcon(weatherId) {
	var weatherCon;
			
	if (weatherId > 199 && weatherId < 322) {
		weatherCon = "thunderstom";
		addIcon(weatherCon);
	}
	if (weatherId > 499 && weatherId < 532) {
		weatherCon = "rainy";
		addIcon(weatherCon);
	}
	if (weatherId > 599 && weatherId < 623) {
		weatherCon = "flurries";
		addIcon(weatherCon);
	}
	if (weatherId > 700 && weatherId < 782) {
		weatherCon = "clouds";
		addIcon(weatherCon);
	}
	if (weatherId === 800) {
		weatherCon = "clear";
		addIcon(weatherCon);
	}
	if (weatherId > 800 && weatherId < 805) {
		weatherCon = "clouds";
		addIcon(weatherCon);
	}
	if (weatherId > 899 && weatherId < 907) {
		weatherCon = "thunderstom";
		addIcon(weatherCon);
	}

}


// Adding Icon
function addIcon(weatherCon) {
	$("." + weatherCon).removeClass('hide');
}