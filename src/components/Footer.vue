<template>
  <div class="footer">
    <div class="main">
      <div class="headertop">
        <div class="registerloginnav">
          <router-link to="/register">Register</router-link>
          <router-link to="/login">Login</router-link>
        </div>
        <div>
          <router-link to="/">logo</router-link>
        </div>
        <div>search</div>
        <div>cart</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.footer {
  overflow: hidden;
  background-color: #e1e1e3;
}
</style>