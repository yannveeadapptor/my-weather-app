import { LatLng } from 'react-native-maps';

export async function fetchWeather(latLong: LatLng) {
  try {
  const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${latLong.latitude}&lon=${latLong.longitude}&units=metric&appid=13512ed766d43b2287298257e6d3dfa1`,
    );

  return response.json();
 } catch (e: unknown) {
  throw new Error(`Error fetching weather data for ${latLong}. Error: ${e}`);
  }
}