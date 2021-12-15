<template>
  <div class="main">
      <form @submit.prevent="updateproduct">
      <div class="productmain">

              <div class="registerForm">
              <div class="upload">
                  <img :src="previewImage" :class="product.profileImage || product.photo ? 'preview' : ''" />
                  <input type="file" accept="image/png, image/jpeg" @change="updateImage" />
              </div>
              </div>
<div class="registerForm" >

                <div class="field">
                    <label><img src="../assets/icons/user.svg" />ชื่อสินค้า :</label>
                    <input v-model="product.name" required />
                    <label><img src="../assets/icons/user.svg" />รายละเอียด :</label>
                    <input v-model="product.description" required />
                    <label><img src="../assets/icons/phone.svg"/>ราคา :</label>
                    <input v-model="product.price" required />
                                        <div class="buttonhalf">
                    <button type="submit" class="registerbtn">แก้ไขข้อมูลสินค้า</button>
                    <button type="button" class="registerbtn" @click="deleteproduct">ลบสินค้า</button>
                    </div>

                </div>
                
          </div>
      </div>
      </form>
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
  </div>
</template>

<script>
import store from "../store";
export default {
    data(){
        return{
            product:{
                name:'',
                description:'',
                price:'',
                photo: '',
                profileImage: null,
            },
        }
    },
    computed:{
                previewImage() {
            if (this.product.profileImage) {
                return URL.createObjectURL(this.product.profileImage)
            }
            else if (this.product.photo) {
                return `${store.state.url}`+this.product.photo
            }
            else {
                return require('../assets/icons/plusPink.svg')
            }
        },
    },
    mounted(){
        this.getProduct()
    },
    methods:{
        getProduct(){
            const getProductURL = `${store.state.url}/products/${this.$route.params.myproductId}`
      fetch(getProductURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {this.product = data
        })            
        },
                updateImage(event) {
            this.product.profileImage = event.target.files[0]
        },
                updateproduct() {
            this.isProcessing = true
            const product = {
                name: this.product.name,
                description: this.product.description,
                price: this.product.price,
            }
            const updateproductURL = `${store.state.url}/products/${this.$route.params.myproductId}`
            fetch(updateproductURL,{method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },
        body: JSON.stringify(product),})
                .then((response) => {
                    if (this.product.profileImage) {
                        const avatar = new FormData()
                        avatar.append('photo', this.product.profileImage)
                        return fetch(updateproductURL,{method: 'PUT',
        headers: {
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },
        body: avatar,})
                    }
                    return response
                })
                .then((response) => {
                    if (response.status === 204) {
                        alert('แก้ไขข้อมูลสินค้าสำเร็จ')
                        this.getProduct()
                    }
                    else {
                        alert('แก้ไขข้อมูลสินค้าไม่สำเร็จ')
                    }
                })
                .finally(() => {
                    this.isProcessing = false
                    this.profileImage = null
                })
        },
        deleteproduct(){
            const deleteURL = `${store.state.url}/products/${this.$route.params.myproductId}`
            fetch(deleteURL,{method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },})
        .then((response) => {
                    if (response.status === 204) {
                        alert('ลบสินค้าสำเร็จ')
                        this.getProfile()
                    }
                    else {
                        alert('ลบสินค้าไม่สำเร็จ')
                    }
                })
        }
    }
}
</script>

<style>
.productmain{
    display: grid;
    grid-template-columns: 50% 50%;
}
.shopmain{
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 35% 65%;
}
</style>