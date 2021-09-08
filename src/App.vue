<template>
  <main>
    <div class="search-box">
      <input type="text" name="weather" class="search-bar" placeholder="Search..." v-model="loc" @keydown.enter="handleSearch" />
    </div>
    <div class="weather-wrap">
      <div class="location-box" v-if="loading">Loading...</div>
      <div class="location-box" v-else-if="!loading && error">{{ error }}</div>
      <div class="location-box" v-if="!loading && Object.values(weather).length">
        <div class="location">{{ weather.location.name }}</div>
        <div class="date">{{ currentTime }}</div>
        <div class="weather-box">
          <div class="temp">{{ Math.floor(weather.current.temp_f) }}<sup>o</sup></div>
          <div class="weather">{{ weather.current.condition.text }}</div>
          <img :src="weather.current.condition.icon" alt="weather">
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      loc:'',
      currentTime:new Date().toDateString(),
      weather: {},
      error:null,
      loading: false,
    }
  },
  methods:{
    async getWeather(location) {
      try {
        this.loading = true;
        this.weather = {};
        this.error = null;
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.VUE_APP_KEY}&q=${location}&aqi=yes`)
        if(response.status === 200){
          const data = await response.json();
          this.weather = data;
        } else {
          throw Error("Error when fetching")
        }
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    handleSearch(){
      this.getWeather(this.loc);
      this.loc = "";
    }
  },
  mounted() {
    this.getWeather('Appleton');
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background:linear-gradient(45deg,rgba(218, 20, 59,0.5),rgba(67, 126, 175,0.8));
  background-size: cover;
  background-position: top;
  transition:0.4s ease;
  height:100vh;
  width:100vw;
}
main{
  min-height: 100vh;
  padding:25px;
  background: linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.25));
}
.search-box {
  width:100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display:block;
  width:100%;
  padding:15px;
  color:#313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline:none;
  background:none;
  background-color: rgba(255,255,255,0.5);
  border-radius: 0 16px;
  transition:0.4s;
  box-shadow: 0 0 8px rgba(0,0,0,0.25);
}
.search-box .search-bar:focus {
  background-color: rgba(255,255,255,0.75);
  box-shadow: 0 0 16px rgba(0,0,0,0.25);
  border-radius: 16px 0;
}
.location-box {
  width:100%;
  text-align: center;
  color:#fff;
  font-size: 24px;
  font-weight: bold;
}
.location-box .location {
  color:#fff;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 3px rgba(0,0,0,0.25);
}
.location-box .date {
  color:#fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  font-style: italic;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display:inline-block;
  padding:10px 25px;
  color:#fff;
  font-size: 102px;
  font-weight: bold;
  text-shadow: 3px 6px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.25);
  border-radius: 16px;
  margin:30px 0;
  box-shadow: 3px 6px rgba(0,0,0,0.25);
}
.weather-box .weather {
  font-size: 48px;
  color:#fff;
  font-weight: bold;
  font-style: italic;
  text-shadow: 3px 6px rgba(0,0,0,0.25);
}
</style>
