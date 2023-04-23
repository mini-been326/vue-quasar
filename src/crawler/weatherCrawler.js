const fs = require('fs');
const crawlWeather = require('./crawlWeather');

async function weatherCrawler() {
  const cities = ['09305101', '09140103', '09215101', '09170101', '09185101'];
  const weatherData = [];

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const data = await crawlWeather(city);
    weatherData.push(data);
  }

  const jsonData = JSON.stringify(weatherData, null, 2);
  fs.writeFileSync('weatherData.json', jsonData, 'utf8');
}

module.exports = weatherCrawler;
