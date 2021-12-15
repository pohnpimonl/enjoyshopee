<template>
  <div class="main">
    <div class="registerlogin">
      <div class="item1">logo</div>
      <div class="item2">
        <form class="registerForm" @submit.prevent="register">
          <div class="upload">
            <img :src="previewImage" :class="profileImage ? 'preview' : ''" />
            <input type="file" accept="image/png, image/jpeg" @change="updateImage" />
          </div>
          <div class="field">
            <label><img src="../assets/icons/user.svg" />name</label>
            <input v-model="name" required />
            <label><img src="../assets/icons/user.svg" />description</label>
            <input v-model="description" required />
            <label><img src="../assets/icons/phone.svg"/>category</label>
            <input v-model="category" required />
            <label><img src="../assets/icons/email.svg" />email</label>
            <input type="email" v-model="email" required />
            <label><img src="../assets/icons/key.svg" />password</label>
            <div :class="error ? 'error' : ''">
            <input type="password" v-model="password" @keyup="validatePassword" required />
            <span>{{ error }}</span>
          </div>
            <label><img src="../assets/icons/key.svg" />re-password</label>
            <div :class="error ? 'error' : ''">
            <input type="password" v-model="confirmPassword" @keyup="validateConfirmPassword" required />
            <span>{{ error }}</span>
          </div>
          </div>
          
            <div class="registerButton">
                <button type="submit" class="registerbtn">สมัครสมาชิก</button>
            </div>
        
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
    data(){
        return {
            name: '',
            description: '',
            category: '',
            email: '',
            password: '',
            confirmPassword: '',
            photo: null,
            error: null,
            isProcessing: false,
        }
    },
    mounted(){
      this.getmyid()
    },
    computed: {
        previewImage() {
            if (this.photo) {
                return URL.createObjectURL(this.photo)
            }
            else {
                return require('../assets/icons/plusPink.svg')
            }
        }
    },
    methods: {
        register() {
            if (!this.error) {
                this.isProcessing = true
                const formData = new FormData()
                formData.append('name', this.name)
                formData.append('description', this.description)
                formData.append('category', this.category)
                formData.append('email', this.email)
                formData.append('password', this.password)
                if (this.photo) {
                    formData.append('photo', this.photo)
                }
                const createshopURL = `${store.state.url}/register`
                fetch(createshopURL,{method: 'POST',body: formData})
                    .then((response) => {
                        if (response.status === 201) {
                            alert('ลงทะเบียนสำเร็จ')
                            this.$router.replace('/login')
                        }
                        else {
                            alert('ลงทะเบียนไม่สำเร็จ')
                        }
                    })
                    .finally(() => {
                        this.isProcessing = false
                        this.name = ''
                        this.description = ''
                        this.category = ''
                        this.email = ''
                        this.password = ''
                        this.confirmPassword = ''
                        this.photo = null
                    })
            }
        },
        updateImage(event) {
            this.photo = event.target.files[0]
        },
        validatePassword(event) {
            if (this.confirmPassword && this.confirmPassword !== event.target.value) {
                this.error = 'รหัสผ่านไม่ตรงกัน'
            }
            else {
                this.error = null
            }
        },
        validateConfirmPassword(event) {
            if (this.password && this.password !== event.target.value) {
                this.error = 'รหัสผ่านไม่ตรงกัน'
            }
            else {
                this.error = null
            }
        },
                getmyid(){
                                          const profileURL = `${store.state.url}/myshop`
            fetch(profileURL,{method:'GET',headers:{Authorization:`Bearer ${this.$root.state.accessToken}`}})
            .then((response) => {if(response.status>=200 && response.status<300){return response.json()}})
            .then((data) => {
                this.$router.replace('/myshop/'+data._id)
                })
                .finally(() => this.isLoading = false)
        }
    }
}
</script>

<style>
.registerlogin{
  display: grid;
  grid-template-columns: 50% 50%;
}
.registerForm {
    width: 100%;
    margin: 0;
    padding: 0 16px;
    border-radius: 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
}
.registerForm .upload {
    background-color: #FFFAFA;
    border-radius: 150px;
    border: 1px solid #DEC3C3;
    width: 150px;
    height: 150px;
    display: flex;
    margin: 16px auto 0;
    position: relative;
}
.registerForm .upload input {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 150px;
    background-color: wheat;
    opacity: 0;
    cursor: pointer;
}
.registerForm .upload img {
    width: 100%;
    height: 100%;
    border-radius: 150px;
    margin: auto;
}
.registerForm .upload img.preview {
    width: 100%;
    height: 100%;
    border-radius: 150px;
    object-fit: cover;
}
.registerForm .field {
    display: grid;
    grid-template-columns: 30% 70%;
    margin-top: 16px;
}
.registerForm .field.error input {
    border: 1px solid red;
}
.registerForm .field.error span {
    color: red;
    font-size: 0.8rem;
}
.registerForm .field label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #555;
}
.registerForm .field label img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
.registerForm .field input {
    margin-top: 12px;
    border: 1px solid #DEC3C3;
    border-radius: 4px;
    background-color: #FFFAFA;
    font-size: 1rem;
    padding: 12px;
}
.registerButton{
  margin: 16px 0;
}
.registerbtn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background-color: #f43f2d;
    color: #FFF;
    border: none;
}
.registerbtn:hover {
    background-color: #f76456;
}
</style>
