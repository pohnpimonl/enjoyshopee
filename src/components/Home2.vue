<template>
  <div>
    <h1>สินค้าทั้งหมด <span class="red">{{totalproduct}}</span> รายการ</h1>
<div class="product">
<div class="card" v-for="product in listProductpage" :key="product.id">
  <div class="productpic">
    <img :src="$root.state.url + product.photo" style="width:100%">
  </div>
  <h2>{{product.name}}</h2>
  <p class="title">{{product.price}} ฿</p>
  <p class="descrip">{{product.description}}</p>
  <p><button><router-link :to="'/product/' + product.id">ดูสินค้า</router-link></button></p>
</div>
</div>
<button class="page" v-for="j in pageProduct" :key="j" @click="onPageProduct(j)" > {{ j }} </button>
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
</style>
