<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <div>
      <b-navbar type="dark">
        <b-navbar-brand id="brand">
          <!-- <b-img id="site_logo" rounded='circle' :src="require('../src/assets/logo.png')"/> -->
          ILP
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-navbar-nav>
            <b-nav-item left="true" :active='$route.name =="home"' to="/">Home</b-nav-item>
            <b-nav-item :active='$route.name =="dashboard"' to="/dashboard">Dashboard</b-nav-item>
            <b-nav-item :active='$route.name =="explore"' to="/explore">Explore</b-nav-item>
          </b-navbar-nav>
          <!-- ONLY when logged out -->
        <b-navbar-nav v-if="!isAuth" class="ml-auto">
          <b-nav-item @click="$bvModal.show('modal-nav')">Register</b-nav-item>
          <b-modal id="modal-nav">
            <template v-slot:modal-header="{ hide }">
              <h5>Choose the type of account</h5>
            </template>

            <template v-slot:default="{ hide }">
              <b-button @click="hide()" :active='$route.name =="compsignup"' to="/comp-signup">Comapanies</b-button>
              <b-button @click="hide()" :active='$route.name =="profsignup"' to="/prof-signup">Professors</b-button>
            </template>

            <template v-slot:modal-footer="{ ok, cancel, hide }">
              <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
              </b-button>
              <!-- Button with custom close trigger value -->
              <b-button size="sm" variant="success" @click="hide()">
                Submit
              </b-button>
            </template>
          </b-modal>
          <b-nav-item :active='$route.name =="signin"' to="/signin">Sign In</b-nav-item>
        </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto">
            <b-nav-item class="mr-2" :active='$route.name =="signin"' to="/signin">My Profile</b-nav-item>
            <b-button v-on:click="logout" pill variant="outline-warning">Log Out</b-button>
          </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
    import {BModal as $bvModal} from "bootstrap-vue/src/components/modal/modal"
    import { mapGetters } from 'vuex'

  export default {
    computed : {
      ...mapGetters('auth', {
        isAuth: 'isAuthenticated',
      })
    },
    methods: {
      logout: function () {

        this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/signin')
        })
      }
    },
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Leckerli+One|Open+Sans:400,400i,600,600i,700,700i&display=swap');
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #313e50;
}
li {
  display: table-cell;
  position: relative;
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
#brand{
  font-family: 'Leckerli One', cursive;
  font-size: 28px;
}
nav{
  background: #337137;
}
#site_logo{
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
