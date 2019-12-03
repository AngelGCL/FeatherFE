<template>
  <div class="signin">
    <b-row no-gutters align-v="center">
      <b-col md="8" class="text-center bg">
        <div id="bg-signin"></div>
      </b-col>
      <b-col md="4">
        <div class="mx-auto white-card text-center">
          <h4>
            Log into
            <span>ilp</span>
          </h4>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="showLoginError"
            @dismissed="showLoginError=false"
          >{{loginErrorMessage}}</b-alert>
          <b-container>
            <b-form @submit.stop.prevent="login">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <font-awesome-icon class="input-icon" icon="at" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="email-input"
                    placeholder="Email"
                    name="email-input"
                    v-model="$v.form.email.$model"
                    :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
                    aria-describedby="email-input-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="email-input-feedback">Please enter a valid email</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <font-awesome-icon class="input-icon" icon="lock" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="password-input"
                    placeholder="Password"
                    name="password-input"
                    v-model="$v.form.password.$model"
                    type="password"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
              <b-button id="submit-btn" type="submit">
                <span v-show="!loading">Log In</span>
                <b-spinner type="grow" v-show="loading" small></b-spinner>
              </b-button>
            </b-form>
            <div class="privacy-links text-center mt-5">
              <a href="https://www.upr.edu/reglamentacion-y-politicas-institucionales/" class="mb-5">
                <span>Privacy Policy</span>
              </a>
              <span> | </span>
              <a href="https://www.upr.edu/reglamentacion-y-politicas-institucionales/">
                <span> Terms of Use</span>
              </a>
            </div>
          </b-container>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      showLoginError: false,
      loginErrorMessage: "",
      loading: false
    };
  },
  validations: {
    form: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    login() {
      if (this.$v.form.$anyError) {
        return;
      }
      this.loading = true;
      let signIn_data = {
        email: this.form.email,
        password: this.form.password
      };

      console.log(signIn_data);

      this.$store.dispatch("auth/login", signIn_data).then(
        response => {
          this.loading = false;
          console.log(
            "Got some data, now lets show something in this component"
          );
        },
        error => {
          this.loading = false;
          console.log(error.response);
          this.showLoginError = true;
          this.loginErrorMessage = error.response.data.Error;
        }
      );
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Hind+Madurai:700|Josefin+Sans:400,700|Leckerli+One|Open+Sans:400,400i,600,600i,700,700i&display=swap");
.privacy-links a span, .privacy-links span{
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color:#5c6672;
}
a{
  color:#5c6672;
}
a:hover{
  color:#5c6672;
  text-decoration: underline;
}
.input-icon {
  font-size: 18px;
  color: #5c6672;
}
.container {
  padding: 0 2rem;
}
.form-control:focus {
  border-color: #337137;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(51, 113, 55, 0.452);
  box-shadow: 0 0 0 0.2rem rgba(51, 113, 55, 0.452);
}
.bg {
  height: 100vh;
}
#bg-signin {
  /*noinspection CssUnknownTarget*/
  background-image: url("~@/assets/uprm.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
.btn {
  background: white;
  color: inherit;
}
#submit-btn span {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
}
.btn:hover {
  background: #e9e6e6;
}
h4 {
  font-family: "Josefin Sans", sans-serif;
  color: white;
}
.white-card {
  width: 350px;
  background: white;
}
.white-card h4 {
  color: #313e50;
}
.white-card h4 span {
  font-size: 35px;
  color: #337137;
  font-weight: bold;
}
.white-card img {
  width: 30%;
}
</style>
