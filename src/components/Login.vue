<template>
  <div class="main">
    <div class="registerlogin">
      <div>logo</div>
      <div>
        <form class="registerForm" @submit.prevent="login">
            <div class="field">
                <label><img src="../assets/icons/email.svg" />อีเมล</label>
                <input type="email" v-model="username" required />
                <label> <img src="../assets/icons/key.svg" /> รหัสผ่าน </label>
                <input type="password" v-model="password" required />
            </div>
            <div class="registerButton">
              <button type="submit" class="registerbtn">เข้าสู่ระบบ</button>
            </div>
            <button type="button" class="registerbtn"><router-link to="/register">สมัครสมาชิก</router-link></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
    data(){
        return {
            username: 'rov@gmail.com',
            password: '123456',
            isProcessing: false,
        }
    },
    mounted(){
      this.getmyid()
    },
    methods: {
        login() {
            this.isProcessing = true
          const data ={
               email:this.username,
               password:this.password
           }
           const loginURL = `${store.state.url}/login`
           fetch(loginURL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
                .then((response) => response.json())
                .then((data) => {
                    store.setUser(data.token)
                    alert('ยินดีต้อนรับ')
                    this.username = ''
                    this.password = ''
                    this.getmyid()

                    
                })
                .catch(() => {
                    alert('เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง')
                })
                .finally(() => {
                    this.isProcessing = false
                })
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

</style>