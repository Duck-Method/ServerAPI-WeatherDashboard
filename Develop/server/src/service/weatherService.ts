import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  windSpeed: number;
  humidity:number;

  constructor(temperature: number, windSpeed: number, humidity: number) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';
  // TODO: Create fetchLocationData method
 private async fetchLocationData(query: string): Promise<any> {
  const geocodeURL = this.buildGeocodeQuery(query);
  const response = await fetch(geocodeURL);
  const data = await response.json();
  return data;
 }
  // TODO: Create destructureLocationData method
 private destructureLocationData(locationData: Coordinates): Coordinates {
  const { lat, lon } = locationData[0];
  return { lat, lon };
 }
  // TODO: Create buildGeocodeQuery method
 private buildGeocodeQuery(city: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
 }
  // TODO: Create buildWeatherQuery method
 private buildWeatherQuery(coordinates: Coordinates): string {
  return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
 }
  // TODO: Create fetchAndDestructureLocationData method
 private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
  const locationData = await this.fetchLocationData(city);
  return this.destructureLocationData(locationData);
 }
  // TODO: Create fetchWeatherData method
 private async fetchWeatherData(coordinates: Coordinates): Promise <any> {
  const weatherQuery = this.buildWeatherQuery(coordinates);
  const response = await fetch(weatherQuery);
  const data = await response.json();
  return data;
 }
  // TODO: Build parseCurrentWeather method
 private parseCurrentWeather(response: any): Weather {
  const temperature = response.main.temp;
  const windSpeed = response.wind.speed;
  const humidity = response.main.humidity;
  
  return new Weather(temperature, windSpeed, humidity);
 }
  // TODO: Complete buildForecastArray method
 private buildForecastArray(currentWeather: Weather, weatherData: any[]) Weather[] {
      return weatherData.map(data => {
      return new Weather(
        data.main.temp,
        data.weather[0].description,
        data.wind.speed,
        data.main.humidity
      );
    });
 }
  // TODO: Complete getWeatherForCity method
 async getWeatherForCity(city: string) {}
}

export default new WeatherService();
