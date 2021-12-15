<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
export default {
  components: { Header, Footer },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: "Kanit", sans-serif;
}
</style>