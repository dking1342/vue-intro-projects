<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <img
          src="https://images4.alphacoders.com/474/thumbbig-47438.webp"
          alt="feature film"
          class="feature-img"
        />
        <div class="detail">
          <h3>Naruto</h3>
          <p>
            Naruto Uzamaki, a mischievious adolescent ninja, struggles as he
            searches for recognition and dreams of becoming the Hokage, the
            village's leader and strongest ninja.
          </p>
        </div>
      </router-link>
    </div>
    <form @submit.prevent="SearchMovies" class="search-box">
      <input
        type="text"
        placeholder="What are you looking for?"
        v-model="search"
      />
      <input type="submit" value="Search" />
    </form>

    <div class="movies-list">
      <div v-if="loading">loading...</div>
      <div v-if="!loading && error">{{ error }}</div>
      <div v-if="!loading && movies.length" class="movies-list">
        <div v-for="movie in movies" :key="movie.imdbID" class="movie">
          <router-link :to="`/movie/${movie.imdbID}`" class="movie-link">
            <div class="product-img">
              <img :src="movie.Poster" :alt="movie.Title" />
              <div class="type">{{ movie.Type }}</div>
            </div>
            <div class="detail">
              <p class="year">{{ movie.Year }}</p>
              <h3>{{ movie.Title }}</h3>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  name: "Home",
  setup() {
    const search = ref("");
    let movies = ref([]);
    let error = ref(null);
    let loading = ref(false);

    const SearchMovies = () => {
      loading.value = true;
      if (search.value !== "") {
        fetch(
          `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_KEY}&s=${search.value}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.Response === "True") {
              movies.value = data.Search;
              search.value = "";
            } else {
              throw Error("Error when fetching movies");
            }
          })
          .catch((err) => (error.value = err.message));
      }
      loading.value = false;
    };

    return {
      search,
      movies,
      SearchMovies,
      loading,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  .feature-card {
    position: relative;

    .feature-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;
      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0 3px 6px rgba($color: #000000, $alpha: 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;
        cursor: pointer;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movies-list {
    margin: 0 8px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .movie {
      padding: 16px 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-img {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #43b885;
            color: #fff;
            bottom: 16px;
            left: 0;
            text-transform: uppercase;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0 0 8px 8px;

          .year {
            color: #aaa;
            font-size: 14px;
          }

          h3 {
            color: #fff;
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
