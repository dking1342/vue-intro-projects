<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-space></v-space>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link</v-btn>
        <v-btn flat>Link</v-btn>
        <v-btn flat>Link</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="sass"></style>
