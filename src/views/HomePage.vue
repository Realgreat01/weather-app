<template>
 <div id="home" v-if="home">
   <img src="../assets/images/logo.svg" alt="" id="logo">
  <div id="user-info">
    <div>
      <input type="text" id="city" v-model.lazy="cityName" placeholder="Enter city name">
    </div>
  </div>

  <button id="getLocationInfo" @click="getCurrentLocation()">Check Weather</button>

  <div v-if="notFound" class="no-result">
    <img src="https://i.gifer.com/GviB.gif" alt="">
    <h1>Oops!  &nbsp; We are not able to get a result.</h1>
  </div>
 </div>
 <template v-if="weatherPage">
  <WeatherPage @changeLocation = changeLocation() />
 </template>
</template>

<script>
import WeatherPage from '@/components/WeatherPage.vue'

export default {
  name: 'HomePage',
  data () {
    return {
      notFound: false,
      home: true,
      weatherPage: false,

      cityName: '',
      alphaCode: '',

      openWeatherOptions: {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_OPEN_WEATHER_API_KEY,
          'X-RapidAPI-Host': process.env.VUE_APP_OPEN_WEATHER_API_HOST
        }
      }
    }
  },

  components: {
    WeatherPage
  },
  $emits: ['changeLocation'],
  methods: {
    async getCurrentLocation () {
      try {
        if (this.cityName.length >= 3) {
          const response = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${this.cityName}&units=metric`, this.openWeatherOptions)
          const data = await response.json()
          console.log(data.cod)
          localStorage.setItem('cityName', data.name)
          if (data.cod === 200) {
            this.home = false
            this.weatherPage = true
          } else {
            this.notFound = true
            this.home = true
            this.weatherPage = false
          }
          return data
        } else {
          this.notFound = true
          this.home = true
          this.weatherPage = false
        }
      } catch (error) {
        this.notFound = true
        this.home = true
        this.weatherPage = false
        console.log(error)
      }
    },
    changeLocation () {
      this.home = true
      this.weatherPage = false
      this.notFound = false
      this.cityName = ''
    }
  }
}
</script>

<style lang="scss">
</style>
