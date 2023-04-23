const axios = require('axios');
const cheerio = require('cheerio');

async function crawlWeather(city) {
  try {
    const url = `https://weather.naver.com/today/${city}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // 기온, 강수량, 풍속, 풍향, 습도 크롤링
    const temp = $('.today_area .main_info .temperature .todaytemp').text();
    const rain = $('.today_area .summary_info .rain .rainfall').text();
    const windSpeed = $('.today_area .sub_info .detail_box .wind .wind_speed').text();
    const windDirection = $('.today_area .sub_info .detail_box .wind .direction').text();
    const humidity = $('.today_area .sub_info .detail_box .humidity').text();

    // 결과물 객체 반환
    return {
      city: city,
      temp: temp,
      rain: rain,
      windSpeed: windSpeed,
      windDirection: windDirection,
      humidity: humidity
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = crawlWeather;
