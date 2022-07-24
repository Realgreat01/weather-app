<template>
  <h1 id="app-name">Verix Weather App</h1>
  <div id="user-info">
      <input type="text" v-model.lazy="city" placeholder="Enter city name">
      <input type="text" @keyup.enter="getCountryCode()" v-model.lazy="country" placeholder="Enter country short name">
  </div>

  <button id="getLocationInfo" @click="getCurrentLocation()">Get Location</button>

  <div v-if="countryCode">
    <h1>invalid Country Code or City</h1>
  </div>
  <div v-if="notFound">
    <h1>Oops We are not able to get a result</h1>
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
      country: '',
      alphaCode: '',

      forecaOptions: {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_FORECA_API_KEY,
          'X-RapidAPI-Host': process.env.VUE_APP_FORECA_API_HOST
        }
      },
      codesOfCountryOptions: {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_COUNTRY_CODE_KEY,
          'X-RapidAPI-Host': process.env.VUE_APP_COUNTRY_CODE_HOST
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
          this.countryCode = true
          this.notFound = false
        }
      } catch {
        this.countryCode = false
        this.notFound = true
      }
    },
    async getCountryCode () {
      try {
        const response = await fetch(`https://codesofcountry.p.rapidapi.com/query/${this.country}`, this.codesOfCountryOptions)
        const data = await response.json()
        const { result } = data
        // eslint-disable-next-line camelcase
        const { iso_alpha_two } = result[0]
        // eslint-disable-next-line camelcase
        const alphaCode = iso_alpha_two.toLowerCase()
        this.alphaCode = alphaCode
        console.log(this.alphaCode.length)
        return this.alphaCode
      } catch {
        this.countryCode = true
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/main.scss';
</style>
