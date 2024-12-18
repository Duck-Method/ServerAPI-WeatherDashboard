import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon?: string;
  iconDescription?: string;
  tempF: number;
  windSpeed: number;
  humidity:number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = `https://api.openweathermap.org/data/2.5/forecast?`;
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';
  
  // TODO: Create fetchLocationData method
 private async fetchLocationData(cityName: string): Promise<Coordinates> {
  try {
    const geocodeURL = this.buildGeocodeQuery(cityName);
    const response = await fetch(geocodeURL);
    if (!response.ok) {
      throw new Error (`Failed to fetch locations data for ${this.cityName}`);
    }

    const data = await response.json();
    if (data.length === 0) {
      throw new Error(`No location data found for ${this.cityName}`);
    }
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
 }
 
 // TODO: Create destructureLocationData method
 private destructureLocationData(locationData: Coordinates): Coordinates {
  const { lat, lon } = locationData;
  return { lat, lon };
 }
  // TODO: Create buildGeocodeQuery method
 private buildGeocodeQuery(cityName: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`;
 }
  // TODO: Create buildWeatherQuery method
 private buildWeatherQuery(coordinates: Coordinates): string {
  return `${this.baseURL}&lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=5&appid=${this.apiKey}&units=imperial`;
 }
  // TODO: Create fetchAndDestructureLocationData method
 private async fetchAndDestructureLocationData(cityName: string): Promise<Coordinates> {
  const locationData = await this.fetchLocationData(cityName);
  return this.destructureLocationData(locationData);
 }
  // TODO: Create fetchWeatherData method
 private async fetchWeatherData(coordinates: Coordinates): Promise <any> {
  const weatherQuery = this.buildWeatherQuery(coordinates);
  const response = await fetch(weatherQuery);
  const data = await response.json();

  // console.log('API response:', data);
  return data;
 }
  // TODO: Build parseCurrentWeather method
 private parseCurrentWeather(response: any): Weather {
  const firstEntry = response.list[0];
  const secondEntry = response.city;
  const city = secondEntry.name;
  const date = firstEntry.dt_txt;
  const icon = firstEntry.weather[0].icon;
  const iconDescription = firstEntry.weather[0].description;
  const tempF = firstEntry.main.temp;
  const windSpeed = firstEntry.wind.speed;
  const humidity = firstEntry.main.humidity;
  
  return new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity);
 }
  // TODO: Complete buildForecastArray method
 private buildForecastArray( weatherData: any[]): Weather[] {
      // console.log("Current Weather:", currentWeather);

      return weatherData.map((data:any) => {
      return new Weather(
        data.name,
        data.dt_txt,
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp,
        data.wind.speed,
        data.main.humidity,
      );
    });
 }
  // TODO: Complete getWeatherForCity method
 async getWeatherForCity(cityName: string) {
  try {
    const coordinates = await this.fetchAndDestructureLocationData(cityName);
    console.log('Coordinates:', coordinates);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray( weatherData.list);
    return  [ currentWeather, forecastArray ];
  } catch (error) {
    console.error('Error getting weather for city:', error);
    throw error;
  }
 }
}

export default new WeatherService();
