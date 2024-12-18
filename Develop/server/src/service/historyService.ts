import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// TODO: Define a City class with name and id properties
class City {
  cityName: string;
  cityId: number;
  constructor(cityName: string, cityId: number) {
    this.cityName = cityName;
    this.cityId = cityId;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string = path.join(__dirname, '../db/searchHistory.json');
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]>{
    try{
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }
  
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.promises.writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }
  
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(cityName, cities.length + 1);
    cities.push(newCity);
    await this.write(cities)
  }
  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: number): Promise<void> {
      const cities = await this.read();
      const updatedCities = cities.filter(city => city.cityId !== id);
      await this.write(updatedCities);
  }
}

export default new HistoryService();
