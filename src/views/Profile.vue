 <template>
  <div class="profile">
    <!-- <div v-if="!loading">
      <pacman-loader :loading="loading" :color="green" :size="30"></pacman-loader>
    </div>-->

    <div v-if="loading">
      <b-container>
        <b-row no-gutter class="mt-5">
          <b-col md="6">
            <b-row>
              <b-col class="profile-info">
                <h2>{{companyData.firstname}} {{companyData.lastname}}</h2>
                <p><span>Company: </span>{{companyData.companyname}}</p>
                <p><span>Employee Position: </span>{{companyData.empposition}}</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <div class="mx-auto activities-header">
              <h3>Areas of Interest</h3>
            </div>
            <div class="badges mt-1 mb-4">
              <div>
                <b-badge v-for="area in companyData.areasinterest" variant="secondary">{{area}}</b-badge>
              </div>
            </div>
            <div class="mx-auto activities-header">
              <h3>Activities</h3>
            </div>
            <div class="badges mt-1 mb-4">
              <div>
                <b-badge v-for="activity in companyData.activities" variant="secondary">{{activity}}</b-badge>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      companyData: {
        firstname: null,
        lastname: null,
        empposition: null,
        companyname: null,
        areasinterest: [],
        activities: [],
      },
      loading: false
    };
  },
  methods: {
    login() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      let signIn_data = {
        email: this.form.email,
        password: this.form.password
      };

      console.log(signIn_data);

      this.$store.dispatch("auth/login", signIn_data).then(() => {
        console.log("Success");
      });
    },
    init() {
      //Populate Profile Information at start
      this.loading = false;
      var userid = localStorage.getItem("userid");
      var token = localStorage.getItem("token");
      console.log(userid);
      console.log(token);

      Vue.http
        .get("http://localhost:5000/Feather/getprofilebyuserid/" + userid, {
          headers: {
            "Content-type": "application/json",
            "token": token,
          }
        })
        .then(response => {
          this.loading = true;
          console.log(response);
          this.companyData.firstname = response.body.firstname;
          this.companyData.lastname = response.body.lastname;
          this.companyData.empposition = response.body.empposition;
          this.companyData.companyname = response.body.company;
          this.companyData.areasinterest = response.body.tags;
          this.companyData.activities = response.body.activities;
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.init();
      next();
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Hind+Madurai:700|Josefin+Sans:400,700|Leckerli+One|Open+Sans:400,400i,600,600i,700,700i&display=swap");
h2{
  font-family: 'Josefin Sans', sans-serif;
  font-size: 4rem;
  font-weight: bold;
}
.badges{
  text-align: left;
}
.badge{
  font-size: 14px;
  margin-right: 1rem;
}
.profile-info {
  text-align: left;
}
.profile-info p {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}
.activities-header {
  border-bottom: 2px solid #313e50;
}
.activities-header h3 {
  font-family: "Open Sans", sans-serif;
  margin-bottom: none;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 0;
}
</style>
