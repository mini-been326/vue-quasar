import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
  getWeather(city) {
    const url = `${BASE_URL}/api/weather/${city}`;
    return axios.get(url);
  },
  createWeather(data) {
    const url = `${BASE_URL}/api/weather`;
    return axios.post(url, data);
  },
  getWeatherList() {
    const url = `${BASE_URL}/api/weather`;
    return axios.get(url);
  },
  updateWeather(id, data) {
    const url = `${BASE_URL}/api/weather/${id}`;
    return axios.put(url, data);
  },
  deleteWeather(id) {
    const url = `${BASE_URL}/api/weather/${id}`;
    return axios.delete(url);
  },
  resetWeather() {
    const url = `${BASE_URL}/api/weather/reset`;
    return axios.post(url);
  }
};
