<template>
  <div class="home">
    <div class="hero">
      <div class="nav">
        <img :src="logo" style="width: 100px;">
        <button @click="toLogin()">Login</button>
      </div>
      <h1>Send receipts, get feedback, and view business analytics</h1>
      <p class="about">...Free for life with Leyyow.</p>
      <div class="prod_img"><img :src="prod_img"></div>
      
      <div class="auth">
        <button class="button" @click="toSignup()">Get started</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      navOpen: false,
      email: "",
      loading: false,
      hasError: false,
      logo: require('../assets/logo_1.png'),
      prod_img: require('../assets/prod_img.png')
    };
  },
  computed: {
    isLoggedIn() {
      let token = window.sessionStorage.getItem("leyyow_token");
      return token ? true : false;
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toSignup() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 20px;
  .nav {
    margin-top: 20px;
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .links,
    img {
      position: relative;
    }
    button {
      border: 1px solid #FFF;
      border-radius: 5px;
      letter-spacing: 1px;
      padding: 5px 15px;
    }
  }
}
.home {
  overflow-y: hidden;
  position: relative;
  height: 100vh;
  background: #0C2C5E;
  color: #FFF;
}
h1 {
  margin-top: 30px;
  font-family: Comfortaa, Helvetica, Arial, sans-serif;
  color: #FFF;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.01em;
  line-height: 120%;
}
.about {
  margin: 10px 0 50px;
  text-align: center;
  font-size: 18px;
  line-height: 120%;
  font-weight: 300;
}
.auth {
  position: relative;
  z-index: 50;
  padding-top: 40px;
  margin-top: -50px;
  background: #0C2C5E;
}
.prod_img {
  display: grid;
  // grid-template-rows: 1fr;
  // width: 100%;
  // max-width: 500px;
  // margin: 0 auto;
}
.prod_img img {
  display: flex;
  margin: auto;
  width: 100%;
  max-width: 500px;
}
.button {
  display: block;
  width: 260px;
  margin: 0 auto;
  font-size: 20px;
  padding: 15px;
  border: none;
  background: #00b241;
  border-radius: 10px;
}
</style>
