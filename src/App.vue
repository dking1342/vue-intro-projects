<template>
  <main>
    hello
  </main>
</template>

<script>

export default {
  name: 'App',
  methods:{
    async getWeather(location) {
      try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.VUE_APP_KEY}&q=${location}&aqi=yes`)
        if(response.status === 200){
          const data = await response.json();
          console.log('data',data)
        } else {
          throw Error("Error when fetching")
        }
      } catch (error) {
        console.log('error',error.message)
      }
    },
  },
  mounted() {
    this.getWeather('Appleton');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
