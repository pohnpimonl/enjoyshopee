<template>
  <div>
    <div class="header">
        <router-link to="/"><img :src="logo" class="logo"/></router-link>
        <div>
      <h1>คลิกง่าย ช้อปได้ทันที</h1>
      <p>เพียงแค่คลิก <b>คุณจะไม่พลาด!</b> กับสินค้าน่าช้อป และสินค้าโดนใจในราคาพิเศษ</p>
        </div>

      
    </div>

    <div class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/shops">ร้านค้าทั้งหมด</router-link>
      <router-link to="/products">สินค้าทั้งหมด</router-link>
      <router-link to="/member" class="right">ระบบสมาชิก</router-link>
    </div>

    <div class="row">
      <div class="side">
        <router-link to="/">Home</router-link>
        <router-link to="/shops">ร้านค้าทั้งหมด</router-link>
        <router-link to="/products">สินค้าทั้งหมด</router-link>
        <router-link to="/member">ระบบสมาชิก</router-link>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>

    <div class="footer">
      <p>© 2021 Enjoy shopee. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
      data() {
    return {
      logo: require("./assets/enjoy.png")
    }
  }
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

/* Header/logo Title */
.header {
  padding: 24px 32px 0;
  /* text-align: center; */
  background: #ff4b2b;
  color: white;
  display: flex;
  flex-direction: row;
}

/* Increase the font size of the heading */
.header h1 {
  font-size: 40px;
}

.logo{
    height: 100px;
    margin: 0 32px 0 0;
}

/* Sticky navbar - toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed). The sticky value is not supported in IE or Edge 15 and earlier versions. However, for these versions the navbar will inherit default position */
.navbar {
  overflow: hidden;
  background-color: #333;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

/* Style the navigation bar links */
.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}

/* Right-aligned link */
.navbar a.right {
  float: right;
}

/* Change color on hover */
.navbar a:hover {
  background-color: #ddd;
  color: black;
}

/* Active/current link */
.navbar a.active {
  background-color: #666;
  color: white;
}

/* Column container */
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}

/* Create two unequal columns that sits next to each other */
/* Sidebar/left column */
.side {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
  background-color: #f1f1f1;
  /* padding: 20px; */
}
.side a{
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  border: 1px solid #AAA;
}
.side a:hover {
  background-color: #666;
  color: #f1f1f1;
}

/* Main column */
.main {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
  background-color: white;
  padding: 20px;
}

/* Fake image, just for this example */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Footer */
.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
}

/* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 700px) {
  .row {
    flex-direction: column;
  }
}

/* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
@media screen and (max-width: 400px) {
  .navbar a {
    float: none;
    width: 100%;
  }
}
</style>