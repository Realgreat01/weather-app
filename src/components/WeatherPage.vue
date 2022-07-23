<template>
<div id="main-app">
  <div id="flex">
  <div id="time-date">
    <h2 id="time">{{currentTime}}</h2>
    <h2 id="date">{{currentDate}}</h2>
  </div>
  <div id="location-info">
    <h2 id="city">Lagos{{cityName}}</h2>
    <h2 id="country"> Nigeria{{country}}</h2>
    <h2 id="time-zone">Lagos/Nigeria{{timeZone}}</h2>
</div>

</div>

<div v-for="(weather, index) in currentWeather" :key="index" id="weather">

    <div class="temperature">
      <img :src="`https://developer.foreca.com/static/images/symbols/${weather.symbol}.png`" alt="">
      <h1>{{weather.temperature}}<span>°C</span> </h1>
      <div>{{weather.symbolPhrase}}</div>
    </div>

  <section>
      <div class="weather-info">
        <img src="../assets/images/windy-wind-svgrepo-com.svg" alt="" class="weather-icons">
        <div>
          <h2>Wind Speed</h2>
          <h1>{{weather.windSpeed}}</h1>
          <h2>m/s</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/humidity.svg" alt="" class="weather-icons">
        <div>
          <h2>Relative Humidity</h2>
          <h1>{{weather.relHumidity}}</h1>
          <h2>%</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/cloud.svg" alt="" class="weather-icons">
        <div>
          <h2>Cloudiness</h2>
          <h1>{{weather.cloudiness}}</h1>
          <h2>%</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/pressure.svg" alt="" class="weather-icons">
        <div>
          <h2>Pressure</h2>
          <h1>{{weather.pressure}}</h1>
          <h2>hPa</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/dewpoint.svg" alt="" class="weather-icons">
        <div>
          <h2>Dew Point</h2>
          <h1>{{weather.dewPoint}}</h1>
          <h2>°C</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/visibility.svg" alt="" class="weather-icons">
        <div>
          <h2>Visibility</h2>
          <h1>{{(weather.visibility/1000).toFixed(2)}}</h1>
          <h2>km</h2>
        </div>
  </div>
  </section>
</div>
</div>
</template>

<script>

import { store } from '../store/store.js'
export default {
  data () {
    return {
      currentWeather: [{
        time: '2021-09-24T10:42+01:00',
        symbol: 'd310',
        symbolPhrase: 'clear',
        temperature: 16,
        feelsLikeTemp: 16,
        relHumidity: 75,
        dewPoint: 12,
        windSpeed: 5,
        windDirString: 'W',
        windGust: 9,
        precipProb: 2,
        precipRate: 0,
        cloudiness: 15,
        thunderProb: 0,
        uvIndex: 2,
        pressure: 1016.51,
        visibility: 36143
      }],
      locationInfo: [],
      timeNow: new Date(),
      currentDate: '',
      currentTime: '',

      cityName: '',
      timeZone: '',
      country: '',

      store,
      cityID: parseInt(localStorage.getItem('cityID')),
      options: {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'cd05a6f87amsh21b3f67eede30aep17ac4ejsn1fe376082b4e',
          'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
      }
    }
  },

  methods: {
    async getWeatherData () {
      const response = await fetch(`https://foreca-weather.p.rapidapi.com/current/${this.cityID}`, this.options)
      const data = await response.json()
      this.currentWeather = data
      // const { current } = data
      // const { time } = current
      return this.currentWeather
    },
    async getLocationData () {
      const response = await fetch(`https://foreca-weather.p.rapidapi.com/location/${this.cityID}`, this.options)
      const data = await response.json()
      const { name, country, timezone } = data
      console.log(data)
      this.cityName = name
      this.country = country
      this.timeZone = timezone
      return data
    }
  },
  created () {
    // setInterval(() => this.getWeatherData(), 1000)
    // this.getWeatherData()
    this.getLocationData()
    this.currentDate = this.timeNow.toDateString()
    this.currentTime = this.timeNow.toLocaleTimeString()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/weather.scss';
</style>
