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
	sunSet    = $("#sun-set"),
	appuri;

$(document).ready(function($) {
	
	//Get Location
	$.ajax({
		url: 'http://ipinfo.io/',
		type: 'GET',
		dataType: 'json',
	})

	.done(function(location) {
		var place   = location.city,
			apiuri = api + "q=" + place + "&" + "units=metric" + "&" + appid;

		$.ajax({
			url: apiuri,
			type: 'GET',
			dataType: 'json',
		})

		// Update Data On page if we successfully communicate with server
		.done(function(data) {
			temp.text(Math.round(data.main.temp));
			indicator.text("°C");
			city.text(place);

			// Convert Unix Time to Local GMT
			var sunRiseTime = new Date(data.sys.sunrise*1000).toLocaleTimeString(),
				sunSetTime 	= new Date(data.sys.sunset*1000).toLocaleTimeString();

			sunRise.text(sunRiseTime);
			sunSet.text(sunSetTime);

			// Adding Icon
			var weatherCon,
				weatherId = (data.weather[0].id);
			
			if (weatherId > 199 && weatherId < 322) {
				weatherCon = "thunderstom";
				}
			if (weatherId > 499 && weatherId < 532) {
				weatherCon = "rain";
				}
			if (weatherId > 599 && weatherId < 623) {
				weatherCon = "snow";
				}
			if (weatherId > 700 && weatherId < 782) {
				weatherCon = "clouds";
				}
			if (weatherId === 800) {
				weatherCon = "clear";
				}
			if (weatherId > 800 && weatherId < 805) {
				weatherCon = "clouds";
				}
			if (weatherId > 899 && weatherId < 907) {
				weatherCon = "thunderstom";
				}
			else {
				weatherCon = "clear";
				}

			function addIcon(weatherIcon) {
				$('.' + weatherIcon).removeClass('hide');
			};
			addIcon(weatherCon);
		})

		// Show Error Massage if something went Wrong
		.fail(function() {
			console.log("error");
		});
		
	});
	
});