<template>
  <div class="loginregister">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="register">
          <h1>สมัครสมาชิก</h1>
          <div class="upload">
            <img :src="previewImage" :class="profileImage ? 'preview' : ''" />
            <input type="file" accept="image/png, image/jpeg" @change="updateImage" />
          </div>
          <input placeholder="ชื่อร้านค้า" v-model="name" required />
          <input placeholder="คำอธิบายร้านค้า" v-model="description" required />
          <input placeholder="ประเภทสินค้าที่ขาย" v-model="category" required />
          <input type="email" placeholder="E-Mail" v-model="email" required />
          <div :class="error ? 'error' : ''">
            <input type="password" placeholder="Password" v-model="password" @keyup="validatePassword" required />
            <span>{{ error }}</span>
          </div>
          <div :class="error ? 'error' : ''">
            <input type="password" placeholder="Confirmpassword" v-model="confirmPassword" @keyup="validateConfirmPassword" required />
            <span>{{ error }}</span>
          </div>
          <br />
          <button type="submit">สมัครสมาชิก</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="login">
          <h1>เข้าสู่ระบบ</h1>
          <br />
          <input type="email" placeholder="Email" v-model="userlogin" required />
          <input type="password" placeholder="Password" v-model="passwordlogin" required/>
          <br />
          <button  type="submit">Log In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>หากคุณมีบัญชีอยู่แล้ว</h1>
            <p>เข้าสู่ระบบ เพื่อขายสินค้าได้ทันที</p>
            <button class="ghost" id="signIn" @click="gotoregister()">
              เข้าสู่ระบบ
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>ยังไม่มีบัญชีใช่ไหม ?</h1>
            <p>สมัครสมาชิก เพื่อขายสินค้ากับเราสิ!</p>
            <button class="ghost" id="signUp" @click="gotoregister()">
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      name: "",
      description: "",
      category: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
      error: null,
      isProcessing: false,
      userlogin: 'rov@gmail.com',
      passwordlogin: '123456',
    };
  },
      mounted(){
      this.getmyid()
    },
  computed: {
    previewImage() {
      if (this.profileImage) {
        return URL.createObjectURL(this.profileImage);
      } else {
        return require("../assets/icons/plusPink.svg");
      }
    },
  },
  methods: {
    register() {
      if (!this.error) {
        this.isProcessing = true;
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append("category", this.category);
        formData.append("email", this.email);
        formData.append("password", this.password);
        if (this.profileImage) {
          formData.append("photo", this.profileImage);
        }
        const createshopURL = `${store.state.url}/register`;
        fetch(createshopURL, { method: "POST", body: formData })
          .then((response) => {
            if (response.status === 201) {
              alert("ลงทะเบียนสำเร็จ");
              this.$router.replace("/member");
            } else {
              alert("ลงทะเบียนไม่สำเร็จ");
            }
          })
          .finally(() => {
            this.isProcessing = false;
            this.name = "";
            this.description = "";
            this.category = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
            this.photo = null;
          });
      }
    },
    updateImage(event) {
      this.profileImage = event.target.files[0];
    },
    validatePassword(event) {
      if (this.confirmPassword && this.confirmPassword !== event.target.value) {
        this.error = "รหัสผ่านไม่ตรงกัน";
      } else {
        this.error = null;
      }
    },
    validateConfirmPassword(event) {
      if (this.password && this.password !== event.target.value) {
        this.error = "รหัสผ่านไม่ตรงกัน";
      } else {
        this.error = null;
      }
    },
            login() {
            this.isProcessing = true
          const data ={
               email:this.userlogin,
               password:this.passwordlogin
           }
           const loginURL = `${store.state.url}/login`
           fetch(loginURL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
                .then((response) => response.json())
                .then((data) => {
                    store.setUser(data.token)
                    alert('ยินดีต้อนรับ')
                    this.userlogin= ''
                    this.passwordlogin = ''
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
        },
    gotoregister() {
      const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");

      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    },
  },
};
</script>

<style>
.loginregister {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* height: 100vh; */
  margin: 0;
}

.loginregister h1 {
  font-weight: bold;
  margin: 0;
}

.loginregister h2 {
  text-align: center;
}

.loginregister p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

.loginregister span {
  font-size: 12px;
}

.loginregister a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.loginregister button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

.loginregister button:active {
  transform: scale(0.95);
}

.loginregister button:focus {
  outline: none;
}

.loginregister button.ghost {
  background-color: transparent;
  border-color: #ffffff;
  cursor: pointer;
}

.loginregister form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.loginregister input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 700px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff4b2b;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff4b2b);
  background: linear-gradient(to right, #ff4b2b, #ff4b2b);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
.upload {
  background-color: #fffafa;
  border-radius: 150px;
  border: 1px solid #dec3c3;
  width: 150px;
  height: 150px;
  display: flex;
  margin: 24px auto 8px;
  position: relative;
}
.upload input {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 150px;
  background-color: wheat;
  opacity: 0;
  cursor: pointer;
}
.upload img {
  width: 49px;
  height: 56px;
  margin: auto;
}
.upload img.preview {
  width: 100%;
  height: 100%;
  border-radius: 150px;
  object-fit: cover;
}
</style>