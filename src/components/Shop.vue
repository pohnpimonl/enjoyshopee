<template>
  <div>
    <div class="shop0">
      <div class="registerForm">
      <div class="shop1"><img :src="$root.state.url + shop.photo" /></div>
      </div>
      <div>
          <div class="registerForm">
          <div class="field">
            <label><img src="../assets/icons/user.svg" />ชื่อร้านค้า :</label>
            <input v-model="shop.name" disabled />
            <label>รายละเอียดร้านค้า :</label>
            <input v-model="shop.description" disabled />
            <label>ประเภทร้านค้า :</label>
            <input v-model="shop.category" disabled />
            <label><img src="../assets/icons/email.svg" />E-Mail :</label>
            <input v-model="shop.email" disabled />
          </div>
        </div>
      </div>
    </div>
    <div class="shop2">
    <h1>สินค้าทั้งหมดของร้าน <span class="red">{{ shop.name }}</span> มีจำนวน <span class="red">{{total}}</span> รายการ</h1>
    </div>
    <div class="shop3">

<div class="card" v-for="product in product" :key="product.id">
  <div class="productpic">
    <img :src="$root.state.url + product.photo" style="width:100%">
  </div>
  <h2>{{product.name}}</h2>
  <p class="title">{{product.price}} ฿</p>
  <p class="descrip">{{product.description}}</p>
  <p><button><router-link :to="'/product/' + product.id">ดูสินค้า</router-link></button></p>
</div>


     </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      shop: [],
      product: [],
      total:'',
    };
  },
  mounted() {
    this.getShop();
    this.getProductbyshop();
  },
  methods: {
    getShop() {
      const getShopURL = `${store.state.url}/shops/${this.$route.params.shopsId}`;
      fetch(getShopURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          this.shop = data;
        });
    },
    getProductbyshop() {
      const getProductbyshopURL = `${store.state.url}/shops/${this.$route.params.shopsId}/products`;
      fetch(getProductbyshopURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          this.product = data.data;
          this.total = data.total
        });
    },
  },
};
</script>

<style>
.shop0{
  display: grid;
  grid-template-columns: 40% 60%;
}
.shop1{
  margin: auto;

}
.shop1 img{
    height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: 70%;
}
.shop2{
  margin: 8px 0;
}
.shop3{
    display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
}
</style>