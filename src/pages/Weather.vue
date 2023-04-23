<template>
  <div class="q-pa-md">
    <div class="q-gutter-md q-px-md">
      <q-select
        v-model="selectedCity"
        :options="cities"
        label="도시"
        @input="updateWeather"
      />
    </div>
    <div class="q-mt-md q-px-md">
      <q-card>
        <q-card-section class="text-h6">
          {{ selectedCity }} 날씨 정보
        </q-card-section>

        <q-list bordered separator>
          <q-item>
            <q-item-section>기온</q-item-section>
            <q-item-section>{{ weather.temperature }} ℃</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>강수량</q-item-section>
            <q-item-section>{{ weather.rain }} mm</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>풍속</q-item-section>
            <q-item-section>{{ weather.windSpeed }} m/s</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>풍향</q-item-section>
            <q-item-section>{{ weather.windDirection }}</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>습도</q-item-section>
            <q-item-section>{{ weather.humidity }} %</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
import WeatherApi from "../api/WeatherApi.js";

export default {
  name: "Weather",
  data() {
    return {
      selectedCity: "",
      cities: ["서울", "부산", "대구", "인천", "광주", "대전", "울산"],
      weather: {
        temperature: null,
        rain: null,
        windSpeed: null,
        windDirection: null,
        humidity: null,
      },
    };
  },
  methods: {
    async updateWeather() {
      try {
        const response = await WeatherApi.getWeather(this.selectedCity);
        this.weather = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
