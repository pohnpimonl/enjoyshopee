<template>
  <div>
      <div class="shop0">
      <div class="registerForm">
      <div class="shop1"><img :src="$root.state.url + product.photo" /></div>
      </div>
      <div>
          <div class="registerForm">
          <div class="field">
            <label><img src="../assets/icons/user.svg" />ชื่อสินค้า :</label>
            <input v-model="product.name" disabled />
            <label>รายละเอียดสินค้า :</label>
            <input v-model="product.description" disabled />
            <label>ราคาสินค้า :</label>
            <input v-model="product.price" disabled />
          </div>
        </div>
      </div>
    </div>
    <div class="product2">
              <div class="registerForm">
          <div class="field">
            <label><img src="../assets/icons/user.svg" />ชื่อร้านค้า :</label>
            <input v-model="product.shop.name" disabled />
            <label>รายละเอียดร้านค้า :</label>
            <input v-model="product.shop.description" disabled />
            <label>ประเภทร้านค้า :</label>
            <input v-model="product.shop.category" disabled />
          </div>
        </div>
    </div>


      <!-- <div class="productmain">

              <div class="registerForm">
              <div class="upload">
                  <img :src="$root.state.url + product.photo" />
                 
              </div>
              </div>
<div class="registerForm" >
                <div class="field">
                    <label><img src="../assets/icons/user.svg" />ชื่อสินค้า :</label>
                    <input v-model="product.name" disabled />
                    <label><img src="../assets/icons/user.svg" />รายละเอียด :</label>
                    <input v-model="product.description" disabled />
                    <label><img src="../assets/icons/phone.svg"/>ราคา :</label>
                    <input v-model="product.price" disabled />
                </div>
          </div>
        

          <div class="shopmain">
              
<div class="registerForm" >
                <div class="field">
                    <label><img src="../assets/icons/user.svg" />ชื่อร้านค้า :</label>
                    <input v-model="product.shop.name" disabled />
                    <label><img src="../assets/icons/user.svg" />รายละเอียด :</label>
                    <input v-model="product.shop.description" disabled />
                    <label><img src="../assets/icons/phone.svg"/>ประเภท :</label>
                    <input v-model="product.shop.category" disabled />
                </div>
          </div>
          </div>
      </div> -->
  </div>
</template>

<script>
import store from "../store";
export default {
    data(){
        return{
            product:[]
        }
    },
    mounted(){
        this.getProduct()
    },
    methods:{
        getProduct(){
            const getProductURL = `${store.state.url}/products/${this.$route.params.productsId}`
      fetch(getProductURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {this.product = data
        })            
        }
    }
}
</script>

<style>
.product2{
    width: 60%;
    margin: auto;
}
</style>