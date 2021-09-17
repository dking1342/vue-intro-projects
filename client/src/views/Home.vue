<template>
  <div class="view-container">
    <div v-if="isLoggedIn" class="hero-container">
      <h1>Start organizing yourself</h1>
      <button @click="handleProject">Go to Projects</button>
    </div>
    <div v-if="!isLoggedIn" class="hero-container">
      <h1>Begin your journey</h1>
      <button @click="handleLogin">Login</button>
    </div>
    <div class="home-container"></div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { watchEffect } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLoggedIn = ref(false);
    const token = computed(()=> store.state.authentication.token);

    const handleLogin = () => {
      router.push("/login")
    }

    const handleProject = () => {
      router.push("/projects")
    }

    watchEffect(()=>{
      isLoggedIn.value = Boolean(token.value);
    })

    return {
      isLoggedIn,
      handleLogin,
      handleProject,
    }
  },
};
</script>

<style scoped>
.home-container {
  position:absolute;
  top:0;
  right:0;
  left:0;
  bottom:-100px;
  overflow:hidden;
  background-image: url('~@/assets/bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(3px) opacity(0.8) brightness(0.25);
  z-index: -1;
}
.view-container {
  width:100%;
  height:100%;
}
.hero-container {
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
}
h1 {
  font-size: 48px;
  color:#fff;
  text-transform: uppercase;
  text-align: center;
  width:100%;
}
button {
  padding:20px 120px;
  font-size: 24px;
  background-color: steelblue;
  outline: none;
  border:none;
  appearance: none;
  color:#fff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: 0.3s all ease;
}
button:hover{
  filter:brightness(125%);
}
</style>
