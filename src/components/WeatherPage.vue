<template>
<div id="main-app">
  <div id="flex">
  <div id="time-date">
    <h2 id="time">{{currentTime}}</h2>
    <h2 id="date">{{currentDate}}</h2>
  </div>
  <div id="location-info">
    <h2 id="city">{{cityName}}</h2>
    <h2 id="country"> {{country}}</h2>
    <h2 id="time-zone">{{timeZone}}</h2>
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
          <h2 class="weather-value">Wind Speed</h2>
          <h1>{{weather.windSpeed}}</h1>
          <h2 class="weather-unit">m/s</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/humidity.svg" alt="" class="weather-icons">
        <div>
          <h2 class="weather-value">Relative Humidity</h2>
          <h1>{{weather.relHumidity}}</h1>
          <h2 class="weather-unit">%</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/cloud.svg" alt="" class="weather-icons">
        <div>
          <h2 class="weather-value">Cloudiness</h2>
          <h1>{{weather.cloudiness}}</h1>
          <h2 class="weather-unit">%</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/pressure.svg" alt="" class="weather-icons">
        <div>
          <h2 class="weather-value">Pressure</h2>
          <h1>{{weather.pressure}}</h1>
          <h2 class="weather-unit">hPa</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/dewpoint.svg" alt="" class="weather-icons">
        <div>
          <h2 class="weather-value">Dew Point</h2>
          <h1>{{weather.dewPoint}}</h1>
          <h2 class="weather-unit">°C</h2>
        </div>
  </div>
  <div class="weather-info">
        <img src="../assets/images/visibility.svg" alt="" class="weather-icons">
        <div>
          <h2 class="weather-value">Visibility</h2>
          <h1>{{(weather.visibility/1000).toFixed(2)}}</h1>
          <h2 class="weather-unit">km</h2>
        </div>
  </div>
  </section>
</div>
</div>
</template>

<script>

export default {
  data () {
    return {
      currentWeather: [],
      timeNow: new Date(),
      currentDate: '',
      currentTime: '',

      cityName: '',
      timeZone: '',
      country: '',

      cityID: parseInt(localStorage.getItem('cityID')),
      options: {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_FORECA_API_KEY,
          'X-RapidAPI-Host': process.env.VUE_APP_FORECA_API_HOST
        }
      }
    }
  },

  methods: {
    async getWeatherData () {
      const response = await fetch(`https://foreca-weather.p.rapidapi.com/current/${this.cityID}`, this.options)
      const data = await response.json()
      this.currentWeather = data
      const { current } = data
      const { time } = current
      this.timeNow = new Date(time)
      console.log(this.timeNow)
      return this.currentWeather
    },
    async getLocationData () {
      const response = await fetch(`https://foreca-weather.p.rapidapi.com/location/${this.cityID}`, this.options)
      const data = await response.json()
      const { name, country, timezone } = data
      this.cityName = name
      this.country = country
      this.timeZone = timezone
      return data
    }
  },
  created () {
    this.getWeatherData()
    this.getLocationData()
    setTimeout(() => {
      this.currentDate = this.timeNow.toDateString()
      this.currentTime = this.timeNow.toLocaleTimeString()
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/weather.scss';
</style>
