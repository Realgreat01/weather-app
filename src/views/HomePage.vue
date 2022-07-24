<template>
  <h1 id="app-name">Weather App</h1>
  <div id="user-info">
    <div>
      <label for="city">City Name</label>
      <input type="text" id="city" v-model.lazy="city" placeholder="Enter city name">
    </div>
  <div>
      <label for="alpha-code">Country Code</label>
      <input type="text" id="alpha-code" v-model.lazy="alphaCode" placeholder="Enter alpha-2-code">
    </div>
  </div>

  <button id="getLocationInfo" @click="getCurrentLocation()">Check Weather</button>

  <div v-if="countryCode" class="no-result">
    <img src="https://i.gifer.com/F4kC.gif" alt="">
    <h1>Invalid country or city</h1>
    <h2><a href="https://www.iban.com/country-codes">get country code ↗ </a> </h2>
  </div>
  <div v-if="notFound" class="no-result">
    <img src="https://i.gifer.com/GviB.gif" alt="">
    <h1>Oops!  &nbsp; We are not able to get a result.</h1>
  </div>

</template>

<script>

export default {
  name: 'HomePage',
  data () {
    return {
      notFound: false,
      countryCode: false,

      city: '',
      alphaCode: '',

      forecaOptions: {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_FORECA_API_KEY,
          'X-RapidAPI-Host': process.env.VUE_APP_FORECA_API_HOST
        }
      }
    }
  },

  methods: {
    async getCurrentLocation () {
      try {
        if (this.alphaCode.length === 2) {
          const response = await fetch(`https://foreca-weather.p.rapidapi.com/location/search/${this.city}?lang=en&country=${this.alphaCode}`, this.forecaOptions)
          const data = await response.json()
          const { locations } = data
          const { id } = locations[0]
          this.id = id
          this.countryCode = false
          this.notFound = false
          localStorage.setItem('cityID', this.id)
          this.$router.push('/weather')
          return this.id
        } else {
          setTimeout(
            this.countryCode = true,
            this.notFound = false
            , 2000)
        }
      } catch {
        setTimeout(
          this.countryCode = false,
          this.notFound = true
          , 2000)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
