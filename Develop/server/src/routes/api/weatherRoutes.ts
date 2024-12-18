import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body; // Extract city name from request body

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Fetch weather data using WeatherService
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    
    // TODO: save city to search history
    // Save city to search history using HistoryService
    await HistoryService.addCity(cityName);

    // Respond with the weather data
    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});


// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    return res.status(200).json(history);
  }catch (error) {
    console.error('Error fetching search history:', error);
    return res.status(500).json({error: 'Failed to retrieve search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const cityId = Number(id);
  
  if (isNaN(cityId)) {
    return res.status(400).json({error: 'Invalid city ID'});
  }
  
  try {
    await HistoryService.removeCity(cityId);
    return res.status(200).json({message: 'City removed from history'});
  } catch (error) {
    console.error('Error deleting city from history:', error);
    return res.status(500).json({error: 'Failed to delet city form history'});
  }
});

export default router;
