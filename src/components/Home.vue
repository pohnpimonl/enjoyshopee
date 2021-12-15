<template>
  <div>
    <h1>ร้านค้าทั้งหมด <span class="red">{{totalshop}}</span> ร้าน</h1>
<div class="shop">
<div class="card" v-for="shop in listShoppage" :key="shop.id">
  <div class="shoppic">
    <img :src="$root.state.url + shop.photo">
  </div>
  <h2>{{shop.name}}</h2>
  <p class="title">{{shop.category}}</p>
  <p class="descrip">{{shop.description}}</p>
  <p>{{shop.email}}</p>
  <p><button><router-link :to="'/shop/' + shop.id">ดูร้านค้า</router-link></button></p>
</div>
</div>
<button class="page" v-for="i in pageShop" :key="i" @click="onPageShop(i)" > {{ i }} </button>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      totalshop: 0,
      listShoppage: [],
      pageNumberShop: 1,
      limitShop: 8,
      totalproduct: 0,
      listProductpage: [],
      pageNumberProduct: 1,
      limitProduct: 10,
    };
  },
  mounted() {
    this.getListShoppage();
    this.getListProductpage();
  },
  computed: {
    pageShop() {
      return Math.ceil(this.totalshop / this.limitShop);
    },
    pageProduct() {
      return Math.ceil(this.totalproduct / this.limitProduct);
    },
  },
  methods: {
    getListShoppage() {
      const getListShoppageURL = `${store.state.url}/shops/?limit=${this.limitShop}&page=${this.pageNumberShop}`;
      fetch(getListShoppageURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          this.listShoppage = data.data;
          this.totalshop = data.total;
        });
    },
    onPageShop(page) {
      this.pageNumberShop = page;
      this.getListShoppage();
    },
    getListProductpage() {
      const getListProductpageURL = `${store.state.url}/products/?limit=${this.limitProduct}&page=${this.pageNumberProduct}`;
      fetch(getListProductpageURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          this.listProductpage = data.data;
          this.totalproduct = data.total;
        });
    },
    onPageProduct(page) {
      this.pageNumberProduct = page;
      this.getListProductpage();
    },
  },
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: 0 1px;
  text-align: center;
}

.title {
  color: grey;
  font-size: 18px;
}

.card button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}
.descrip{
  font-size: 12px;
}
.card a {
  text-decoration: none;
  color: white;
}

.card button:hover, .card a:hover {
  opacity: 0.7;
}
.shop{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
.shoppic img,.productpic img{
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: 70%;
}
.product{
   display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%; 
}
.red{
  color: orangered;
}
.page{
  border: 1px solid gainsboro;
  color: red;
  background-color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
}
.page:hover{
    background: #f44336;
  color: white;
}
</style>
