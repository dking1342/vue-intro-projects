<template>
  <div id="nav">
    <router-link to="/"> Home </router-link> |
    <router-link to="/cart"> Cart </router-link>
  </div>
  <section class="container">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: auto;
}
body,
#app {
  background: linear-gradient(
    90deg,
    rgba(162, 206, 221, 0.5),
    rgba(63, 120, 167, 0.5)
  );
  height: 100vh;
  width: 100%;
}
#nav {
  padding: 10px 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    font-weight: bold;
    color: slategray;
    text-decoration: none;
    margin: 0 5px;
    font-size: 1.25rem;

    &.router-link-exact-active {
      color: navy;
    }
  }
}
.container {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
