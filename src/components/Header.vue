<template>
  <div class="header">
    <div class="main">
        <div class="topnav">
        <div class="logo"><router-link to="/"><img :src="logo" /></router-link></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div class="search"><input type="text"><button class="registerbtn">Search</button></div>
        <div><div><router-link to="/register">Register</router-link></div><div><router-link to="/login">Login</router-link></div></div>
        </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("../assets/enjoy.png"),
    }
  }
}
</script>

<style>
.header {
  overflow: hidden;
  background-color: #ffa242;
}
.main {
  width: 78%;
  margin: 0 auto;
}
.topnav{
    display: grid;
    grid-template-columns: 30% 55% 15%;
}
.logo{
    grid-row: 1/4;
}
.logo img{
    width: 100%;
}
.search{
    display: flex;
    flex-direction: row;
}
.search input{
    margin-top: 12px;
    border: 1px solid #DEC3C3;
    border-radius: 4px;
    background-color: #FFFAFA;
    font-size: 1rem;
    padding: 12px;
    width: 100%;
}
</style>