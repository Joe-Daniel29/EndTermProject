import {weatherHumiditySpan, weatherTemperatureSpan, weatherConditionHeading, weatherIconImage, weatherVerdictHead} from "./DOMElements";

// weatherapi.com
const apiKey = "093e4472441c490382354201250902";
const baseURL = "http://api.weatherapi.com/v1";

const dryingConditions = {
	ideal: {
		temp_lower_bound: 25,
		humid_upper_bound: 50,
	},
	may_dry: {
		temp_lower_bound: 15,
		humid_upper_bound: 70,
	},
	not_advisable: {
		temp_lower_bound: 14,
		humid_upper_bound: 71,
	}
};

const getCurrentWeather = async (latitude, longitude) => {
	const response = await fetch(`${baseURL}/current.json?key=${apiKey}&q=${latitude},${longitude}`);
	const data = await response.json();
	return data.current;
}

const getDryingVerdict = (temperature, humidity) => {
	let verdict;
	if (temperature >= 25 && humidity <= 50) {
		verdict = "Ideal to dry clothes";
	} else if (temperature >= 15 && humidity >= 50 && humidity <= 70) {
		verdict = "Clothes just might dry";
	} else {
		verdict = "Not recommended to dry outside";
	}

	return verdict;
}

const WeatherInformationHandler = async () => {
	const weather = await getCurrentWeather(12.848439272276371, 77.65736286544987);
	console.log(weather);

	weatherTemperatureSpan.innerText = weather.temp_c + " C";
	weatherHumiditySpan.innerText = weather.humidity;
	weatherConditionHeading.innerText = weather.condition.text;
	weatherIconImage.src = weather.condition.icon;

	const verdict = getDryingVerdict(weather.temp_c, weather.humidity);
	weatherVerdictHead.innerText = verdict;
}

export default WeatherInformationHandler;
