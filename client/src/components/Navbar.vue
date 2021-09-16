<template>
  <nav>
    <router-link to="/">Vue Todo</router-link>
    <div class="navlist" v-if="!isLoggedIn">
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <div class="navlist" v-if="isLoggedIn">
      <router-link to="/projects">Projects</router-link>
      <button @click="handleLogout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();
    let isLoggedIn = computed(() => store.state.authentication.isLoggedIn);

    const handleLogout = () => {
      store.commit("authentication/setLogout");
      router.push("/");
    };

    return {
      isLoggedIn,
      handleLogout
    };
  }
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 75px;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f4f4;
  padding: 0 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
nav a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d2f3a;
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.3s ease;
}
nav a:hover {
  background-color: rgb(189, 184, 184);
}
nav .navlist {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(2, 100px);
  align-items: center;
  justify-content: center;
}
nav .navlist a:first-child {
  grid-column: 2/3;
}
nav .navlist button {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d2f3a;
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.3s ease;
  outline: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
nav .navlist button:hover {
  background-color: rgb(189, 184, 184);
}
</style>
