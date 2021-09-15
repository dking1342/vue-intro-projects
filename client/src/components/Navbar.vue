<template>
  <nav>
      <router-link to="/">Vue Todo</router-link>
        <div class="navlist" v-if="!isLoggedIn">
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
        </div>
        <div class="navlist" v-if="isLoggedIn">
            <router-link to="#">Projects</router-link>
            <router-link to="#">Logout</router-link>
        </div>
  </nav>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {
  name: "Navbar",
  setup() {
      let isLoggedIn = ref(false);

      return {
          isLoggedIn,
      }
  }
};
</script>

<style scoped>
nav {
    width:100%;
    height:75px;
    position:sticky;
    top:0;
    right:0;
    left:0;
    display:grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    justify-content: space-between;
    background-color: #f4f4f4;
    padding:0 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
nav a {
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:#2d2f3a;
    text-transform: uppercase;
    font-weight: bold;
    transition: 0.3s ease;
}
nav a:hover {
    background-color: rgb(189, 184, 184);
}
nav .navlist {
    width:100%;
    height:100%;
    display:grid;
    grid-template-columns: 1fr repeat(2,100px);
    align-items: center;
    justify-content: center;
}
nav .navlist a:first-child{
    grid-column: 2/3;
}
</style>
