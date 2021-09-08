<template>
  <div class="message-box" v-if="loading">loading...</div>
  <div class="message-box" v-if="!loading && error">{{ error }}</div>
  <div class="movie-detail" v-if="!loading && Object.values(movie).length">
    <h2>{{ movie.Title }}</h2>
    <p class="year">{{ movie.Year }}</p>
    <div class="poster-container">
      <div class="img-container">
        <img :src="movie.Poster" :alt="movie.Title" class="featured-img" />
      </div>
      <p>{{ movie.Plot }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "Movie",
  setup() {
    const route = useRoute();
    let movie = ref({});
    let error = ref(null);
    let loading = ref(false);
    let routeId = ref(route.params.id);

    onBeforeMount(() => {
      loading.value = true;
      fetch(
        `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_KEY}&i=${routeId.value}&plot=full`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "True") {
            movie.value = data;
          } else {
            throw Error(data.Error);
          }
        })
        .catch((err) => (error.value = err.message));
      loading.value = false;
    });

    return {
      movie,
      error,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.message-box {
  width: 100%;
  height: fit-content;
  padding: 15px 0;
  font-size: 24px;
}
.movie-detail {
  padding: 16px;
  display: flex;
  flex-direction: column;
  max-width: minmax(500px, 100%);
  align-items: center;
  justify-content: center;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
  }

  .year {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }

  .poster-container {
    margin-top: 24px;
    width: 100%;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    align-items: flex-start;
    gap: 15px;

    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .featured-img {
        display: block;
        width: 100%;
        object-fit: contain;
      }
    }

    p {
      color: #fff;
      font-style: italic;
      /* height: fit-content; */
      margin-bottom: 24px;
      text-align: justify;
    }
  }
}
</style>
