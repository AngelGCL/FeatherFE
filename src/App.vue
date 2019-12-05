<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <div>
      <b-navbar type="dark">
        <b-navbar-brand id="brand">
          <!-- <b-img id="site_logo" rounded='circle' :src="require('../src/assets/logo.png')"/> -->
          ilp
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-nav>
          <b-nav-item left="true" :active='$route.name =="home"' to="/">Home</b-nav-item>
          <b-nav-item :active='$route.name =="dashboard"' to="/dashboard">Dashboard</b-nav-item>
          <b-nav-item :active='$route.name =="explore"' to="/explore">Explore</b-nav-item>
        </b-navbar-nav>
        <!-- ONLY when logged out -->
        <b-navbar-nav v-if="!isAuth" class="ml-auto">
          <b-nav-item @click="$bvModal.show('register-modal')">Register</b-nav-item>
          <b-modal content-class="register-css" centered id="register-modal" hide-footer hide-header no-fade>
            <template v-slot:default="{ hide }">
              <b-row no-gutters>
                <b-col>
                  <div class="register-link mx-auto text-center">
                    <b-button variant="dark" @click="hide()" to="/comp-signup">
                      <h1>Companies</h1>
                      <font-awesome-icon icon="building" />
                    </b-button>
                  </div>
                </b-col>
                <b-col>
                  <div class="register-link mx-auto text-center"> 
                    <b-button variant="dark" @click="hide()" to="/prof-signup">
                      <h1>Professors</h1>
                      <font-awesome-icon icon="user-graduate" />
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </template>
          </b-modal>
          <b-nav-item :active='$route.name =="signin"' to="/signin">Sign In</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item class="mr-2" :active='$route.name =="profile"' :to="getPath">My Profile</b-nav-item>
          <b-nav-item class="mr-2" v-on:click="logout">Log Out</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
    <!-- <footer class="footer py-1">
      <div class="container">
        <div class="text-left mb-1">
          <a href="https://www.upr.edu/reglamentacion-y-politicas-institucionales/">
        <span>Privacy Policy</span>
        </a>
        </div>
        
        
      </div>
    </footer> -->
  </div>
</template>

<script>
import { BModal as $bvModal } from "bootstrap-vue/src/components/modal/modal";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", {
      isAuth: "isAuthenticated",
      getPath: "getProfilePath"
    })
  },
  methods: {
    logout: function() {
      this.path_to_profile = "";
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/signin");
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Hind+Madurai:700|Josefin+Sans:400,700|Leckerli+One|Open+Sans:400,400i,600,600i,700,700i&display=swap");
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #313e50;
}
/* .footer{
  background-color:#173519;
  color:white;
}
.footer a span{
  color: white;
  font-size: 0.8rem;
} */
a:hover{
  color: white;
}
li {
  display: table-cell;
  position: relative;
}
.register-css{
  background-color: #343a40;
}
.register-link h1{
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
  font-size: 2rem;
}
.btn-logout {
  background-color: white;
  color: inherit;
}
.nav-item a:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #efeef0;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
.nav-item a:hover:after {
  width: 100%;
  left: 0;
}
.active {
  font-weight: bold;
}
#brand {
  font-family: "Hind Madurai", sans-serif;
  font-size: 28px;
}
nav {
  background: #337137;
}
#site_logo {
  width: 40px;
  background: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
