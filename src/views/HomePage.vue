<template>
  <h1 id="app-name">Verix Weather App</h1>
  <div id="user-info">
      <input type="text" v-model.lazy="city" placeholder="Enter city name">
      <input type="text" v-model.lazy="country" placeholder="Enter country short name">
  </div>

  <button id="getLocationInfo" @click="getCurrentLocation()">Get Location</button>

</template>

<script>
import { store } from '../store/store.js'
export default {
  name: 'HomePage',
  data () {
    return {
      store,
      id: 0,
      showWeather: false,
      city: 'lagos',
      country: 'ng',
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
    async getCurrentLocation () {
      if (this.country.length === 2) {
        const response = await fetch(`https://foreca-weather.p.rapidapi.com/location/search/${this.city}?lang=en&country=${this.country}`, this.options)
        const data = await response.json()
        const { locations } = data
        const { id } = locations[0]
        this.id = id
        localStorage.setItem('cityID', this.id)
        this.$router.push('/weather')
        return this.id
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/main.scss'
</style>
