/* --------------------------------------------------------- *
 * We will be using Open Weather API for showing weather *
 * Documentation: https://openweathermap.org/current         *
 * --------------------------------------------------------- */

var api       = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?",
	appid     = "appid=e0b01df8d539332186b67b9610fdd7b2",
	lon       = "lon=",
	lat       = "lat=",
	temp      = $("#temp"),
	indicator = $("#indicator"),
	city      = $("#city"),
	sunRise   = $("#sun-rise"),
	sunSet    = $("#sun-set"),
	appuri;


$("document").ready(function() {
	// Obtaing Lattitude & longitude from user
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			lon += position.coords.longitude;
			lat += position.coords.latitude;
			apiuri     = api + "&" + lon + "&" + lat + "&" + "units=metric" + "&" + appid;

			// Perfoming AJAX request to API server
			$.ajax({
				url: apiuri,
				type: 'GET', jsonp: "callback",
				dataType: 'jsonp',
			})

			// Update Data On page if we successfully communicate with server
			.done(function(data) {
				temp.text(data.main.temp);
				indicator.text("°C");
				city.text(data.name);
				console.log(data);

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
	};

	
});