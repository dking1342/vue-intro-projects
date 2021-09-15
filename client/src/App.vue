<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view />    
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
  export default {
    name: "App",
    components:{
      Navbar,
    }
  }
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  width:100%;
  padding:10px 25px;
  height:100vh;
  overflow: auto;
}

</style>