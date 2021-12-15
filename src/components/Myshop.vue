<template>
  <div>
      <form @submit.prevent="updateProfile">
          <div class="shop0">
              <div class="registerForm">
              <div class="upload">
                  <img :src="previewImage" :class="profileImage || photo ? 'preview' : ''" />
                  <input type="file" accept="image/png, image/jpeg" @change="updateImage" />
              </div>
              </div>
                <div class="registerForm" >
                <div class="field">
                    <label><img src="../assets/icons/user.svg" />ชื่อร้านค้าของคุณ</label>
                    <input v-model="name" required />
                    <label>คำอธิบายร้านค้า</label>
                    <input v-model="description" required />
                    <label>ประเภทของสินค้าที่ขาย</label>
                    <input v-model="category" required />
                    <label><img src="../assets/icons/email.svg" />E-Mail</label>
                    <input v-model="email" disabled />
                    <div class="buttonhalf">
                    <button type="submit" class="registerbtn">แก้ไขข้อมูล</button>
                    <button type="button" class="registerbtn" @click="logout">ออกจากระบบ</button>
                    </div>
                </div>
          </div>
          </div>
      </form>
      <div class="countpro">
          <h1>สินค้าทั้งหมดของร้าน <span class="red">{{ name }}</span> มีจำนวน <span class="red">{{total}}</span> รายการ</h1>
      </div>
      <div class="myshopproduct">
          <div>
              <form @submit.prevent="addproduct">
                  <div class="registerForm">
                  <div class="upload">
                      <img :src="previewImageproduct" :class="product.image || product.photo ? 'preview' : ''" />
                      <input type="file" accept="image/png, image/jpeg" @change="updateImageproduct" />
                  </div>
                  </div>
                  <div class="addproduct">
                      <div class="registerForm">
                          <div class="field">
                              
                              <label>ชื่อสินค้า</label>
                              <input v-model="product.name" required />
                              <label>รายละเอียด</label>
                              <input type="text" v-model="product.description" required />
                              <label>ราคา</label>
                              <input type="number" v-model="product.price" required />
                              
                          </div>
                      </div>
                      <button type="submit" class="registerbtn">เพิ่มสินค้า</button>
</div>
                  
              </form>
          </div>
<div class="card" v-for="eachproduct in myproduct" :key="eachproduct.id">
  <div class="productpic">
    <img :src="$root.state.url + eachproduct.photo" style="width:100%">
  </div>
  <h2>{{eachproduct.name}}</h2>
  <p class="title">{{eachproduct.price}} ฿</p>
  <p class="descrip">{{eachproduct.description}}</p>
  <p><button><router-link :to="'/myproduct/' + eachproduct.id">ดูสินค้า</router-link></button></p>
</div>
      </div>
  </div>
</template>

<script>
import store from '../store'
export default {
    data() {
        return {
            isLoading: false,
            isProcessing: false,
            id:'',
            name: '',
            description: '',
            category: '',
            email: '',
            profileImage: null,
            photo: '',
            product:{
                image:null,
                photo:'',
                name:'',
                description:'',
                price:'',
            },
            myproduct:[],
            mytotal:0,
            eachproduct:{
                image:null,
                name:'',
                description:'',
                price:'',
            },
            total:'',
            
        }
    },
    computed: {
        previewImage() {
            if (this.profileImage) {
                return URL.createObjectURL(this.profileImage)
            }
            else if (this.photo) {
                return `${store.state.url}`+this.photo
            }
            else {
                return require('../assets/icons/plusPink.svg')
            }
        },
        previewImageproduct(){
            if (this.product.image) {
                return URL.createObjectURL(this.product.image)
            }
            else if (this.product.photo) {
                return `${store.state.url}`+this.product.photo
            }
            else {
                return require('../assets/icons/plusPink.svg')
            }
        },
        },
    mounted() {
        this.getProfile()
        this.getProduct()
    },
    methods: {
        logout() {
            store.logout()
                alert('ออกจากระบบสำเร็จ')
                this.$router.replace('/')  
        },
        getProfile() {
            const profileURL = `${store.state.url}/myshop`
            fetch(profileURL,{method:'GET',headers:{Authorization:`Bearer ${this.$root.state.accessToken}`}})
            .then((response) => {if(response.status>=200 && response.status<300){return response.json()}else{alert('Fail')}})
            .then((data) => {
                    this.name = data.name
                    this.description = data.description
                    this.category = data.category
                    this.email = data.email
                    this.photo = data.photo
                })
                .finally(() => this.isLoading = false)
        },
        getProduct(){
                        const getProductURL = `${store.state.url}/shops/${this.$route.params.myId}/products`
      fetch(getProductURL, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {this.myproduct = data.data
        this.total = data.total
        })
        },
        updateImage(event) {
            this.profileImage = event.target.files[0]
        },
        updateImageproduct(event) {
            this.product.image = event.target.files[0]
        },
        updateeditproduct(event){
            this.eachproduct.image = event.target.files[0]
        },
        updateProfile() {
            this.isProcessing = true
            const profile = {
                name: this.name,
                description: this.description,
                category: this.category,
            }
            const updateProfileURL = `${store.state.url}/myshop`
            fetch(updateProfileURL,{method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },
        body: JSON.stringify(profile),})
                .then((response) => {
                    if (this.profileImage) {
                        const avatar = new FormData()
                        avatar.append('photo', this.profileImage)
                        return fetch(updateProfileURL,{method: 'PUT',
        headers: {
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },
        body: avatar,})
                    }
                    return response
                })
                .then((response) => {
                    if (response.status === 204) {
                        alert('แก้ไขข้อมูลร้านค้าสำเร็จ')
                        this.getProfile()
                    }
                    else {
                        alert('แก้ไขข้อมูลร้านค้าไม่สำเร็จ')
                    }
                })
                .finally(() => {
                    this.isProcessing = false
                    this.profileImage = null
                })
        },
        addproduct(){
                const formData = new FormData()
                formData.append('name', this.product.name)
                formData.append('description', this.product.description)
                formData.append('price', this.product.price)
                if (this.product.image) {
                    formData.append('photo', this.product.image)
                }
                const addproductURL = `${store.state.url}/products/`
                fetch(addproductURL,{method:'POST',headers: {
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },body: formData})
                    .then((response) => {
                        if (response.status === 201) {
                            alert('เพิ่มสินค้าสำเร็จ')
                            this.getProduct()
                        }
                        else {
                            alert('เพิ่มสินค้าไม่สำเร็จ')
                        }
                    })
                    .finally(() => {
                        this.isProcessing = false
                        this.product.name = ''
                        this.product.description = ''
                        this.product.price = ''
                        this.product.image = null
                    })
            
        },
                getmyid(){
                                          const profileURL = `${store.state.url}/myshop`
            fetch(profileURL,{method:'GET',headers:{Authorization:`Bearer ${this.$root.state.accessToken}`}})
            .then((response) => {if(response.status>=200 && response.status<300){return response.json()}})
            .then((data) => {this.id=data._id
                this.$router.replace('/myshop/'+data._id)
                })
                .finally(() => this.isLoading = false)
        },
        updateproduct(id){
             this.isProcessing = true
            const product = {
                name: this.eachproduct.name,
                description: this.eachproduct.description,
                price: this.eachproduct.price,
            }
            const updateproduct = `${store.state.url}/products/${id}`
            fetch(updateproduct,{method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$root.state.accessToken}`,
        },
        body: JSON.stringify(product),})
                .then((response) => {
                    if (this.eachproduct.image) {
                        const avatar = new FormData()
                        avatar.append('photo', this.eachproduct.image)
                        return fetch(updateproduct,{method: 'PUT',
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
                        this.getProfile()
                    }
                    else {
                        alert('แก้ไขข้อมูลสินค้าไม่สำเร็จ')
                    }
                })
                .finally(() => {
                    this.isProcessing = false
                    this.profileImage = null
                })
        }
    }
}
</script>

<style>
.myshop{
    display: grid;
    grid-template-columns: 35% 65%;
}
.buttonhalf{
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 49% 49%;
    grid-gap: 2%;
    padding: 16px 0;
}
.myshopproduct{
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
}
.countpro{
    margin: 32px 0;
}
</style>