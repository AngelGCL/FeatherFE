 <template>
  <div class="profile">
    <div v-show="loading">
      <div class="text-center mt-5">
        <b-spinner style="width: 5rem; height: 5rem;" variant="dark" label="loading..."></b-spinner>
      </div>
    </div>
    <!-- Company Component -->
    <div v-show="!loading">
      <b-jumbotron class="header-info" data-aos="fade-up">
        <b-row align-v="center" no-gutter>
          <b-col class sm="5" md="5">
            <h1 class="display-3">{{profileData.firstname}} {{profileData.lastname}}</h1>
          </b-col>
          <b-col class="profile-info" sm="7" md="7">
            <div class="profile-position">
              <b-row>
                <b-col sm="6" md="6">
                  <h4>
                    <font-awesome-icon icon="envelope" />Email
                  </h4>
                  <p>
                    <span>{{profileData.email}}</span>
                  </p>
                </b-col>
                <b-col sm="6" md="6">
                  <h4>
                    <font-awesome-icon icon="suitcase" />Position
                  </h4>
                  <p>
                    <span>{{profileData.position}}</span>
                    <span v-show="profileData.isCompany">at {{profileData.companyname}}</span>
                  </p>
                </b-col>
                <b-col class="mt-2" v-show="profileData.isProfessor" sm="12" md="12">
                  <div>
                    <h4>
                      <font-awesome-icon icon="suitcase" />Department
                    </h4>
                    <p>
                      <span>{{profileData.department}}</span>
                    </p>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="area-of-interest">
              <div class="mt-2">
                <h4>Areas of Interest</h4>
              </div>
              <div class="badges mt-1">
                <div>
                  <b-badge v-for="area in profileData.areasinterest">{{area.tagname}}</b-badge>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- Edit Profile Modal -->
        <b-modal
          header-text-variant="secondary"
          header-bg-variant="light"
          header-border-variant="light"
          body-bg-variant="light"
          footer-border-variant="light"
          footer-bg-variant="light"
          hide-header-close
          button-size="sm"
          id="modalEditProfile"
          title="Edit Profile"
        >
          <b-form>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend is-text>First Name</b-input-group-prepend>
                <b-form-input
                  id="editfirstname-input"
                  v-model="$v.editProfileData.firstname.$model"
                  :state="$v.editProfileData.firstname.$dirty ? !$v.editProfileData.firstname.$error : null"
                  aria-describedby="editfirstname-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="editfirstname-feedback">Do not exceed 25 characters</b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend is-text>Last Name</b-input-group-prepend>
                <b-form-input
                  id="editlastname-input"
                  v-model="$v.editProfileData.lastname.$model"
                  :state="$v.editProfileData.lastname.$dirty ? !$v.editProfileData.lastname.$error : null"
                  aria-describedby="editlastname-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="editlastname-feedback">Do not exceed 25 characters</b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend is-text>Email</b-input-group-prepend>
                <b-form-input
                  id="editemail-input"
                  v-model="$v.editProfileData.email.$model"
                  :state="$v.editProfileData.email.$dirty ? !$v.editProfileData.email.$error : null"
                  aria-describedby="editemail-feedback"
                ></b-form-input>
                <b-form-invalid-feedback
                  id="editemail-feedback"
                >REQUIRED FIELD | Enter a valid email</b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend is-text>Position</b-input-group-prepend>
                <b-form-input
                  id="editposition-input"
                  v-model="$v.editProfileData.position.$model"
                  :state="$v.editProfileData.position.$dirty ? !$v.editProfileData.position.$error : null"
                  aria-describedby="editposition-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="editposition-feedback">Do not exceed 50 characters</b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group v-show="profileData.isProfessor">
              <p>Department:</p>
              <b-form-select v-model="editProfileData.department" :options="departments"></b-form-select>
            </b-form-group>
            <b-form-group v-show="profileData.isProfessor">
              <p>Edit About Me:</p>
              <b-input-group>
                <b-form-textarea
                  id="description"
                  v-model="editProfileData.description"
                  placeholder="About me"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-input-group>
            </b-form-group>
          </b-form>
          <div>
            <label class="typo__label">Areas of Interest:</label>
            <multiselect
              v-model="editProfileData.areasinterest"
              tag-placeholder="Add this as new tag"
              placeholder="Add an area of interest"
              label="tagname"
              track-by="tagid"
              :options="editProfileData.areasinterest"
              :multiple="true"
              :taggable="true"
              :state="$v.editProfileData.position.$dirty ? !$v.editProfileData.position.$error : null"
              aria-describedby="editAreasInterest-feedback"
              @tag="addTag"
            ></multiselect>
            <b-form-invalid-feedback id="editAreasInterest-feedback">Do not exceed 50 characters</b-form-invalid-feedback>
          </div>

          <template v-slot:modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="dark" @click="editProfile">Submit</b-button>
            <b-button size="sm" variant="danger" @click="cancelEdit">Cancel</b-button>
          </template>
        </b-modal>
        <b-container>
          <b-row id="edit-btn-section" align-h="end">
            <b-col></b-col>
            <b-col class="text-right">
              <b-button
                @click="showModalEditProfile"
                class="shadow"
                id="edit-profile-btn"
                pill
                variant="light"
              >
                <font-awesome-icon icon="edit" />Edit
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-jumbotron>
      <b-container>
        <b-row align-v="start" class="aboutme mt-5 mb-5 text-left mr-auto">
          <b-col sm="4" md="4">
            <div class="activities-header">
              <p>About me</p>
            </div>
          </b-col>
          <b-col sm="8" md="8">
            <p>{{profileData.description}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4" md="4" class="text-left">
            <div class="activities-header">
              <p>Activities</p>
            </div>
          </b-col>
        </b-row>
        <b-container>
          <b-modal id="editActivityModal" size="xl">
            <template v-slot:modal-header="{ close }">
              <h5>Edit your activities.</h5>
            </template>
            <template v-slot:default="{ hide }">
              <activity-list v-bind:activities="profileData.activities"
                             v-on:editing-activity="editActivity"
                             v-on:deleting-activity="deleteActivity"></activity-list>
              <create-activity v-on:create-activity="createActivity"></create-activity>
            </template>
            <template v-slot:modal-footer="{ cancel, ok }">
              <b-button size="sm" variant="success" @click="ok()">
                Submit
              </b-button>
            </template>
          </b-modal>
          <b-row id="editAct-btn-section" align-h="end">
            <b-col></b-col>
            <b-col class="text-right">
              <b-button
                @click="$bvModal.show('editActivityModal')"
                class="shadow"
                id="edit-act-btn"
                pill
                variant="light"
              >
                <font-awesome-icon icon="edit" />Edit
              </b-button>
            </b-col>
          </b-row>
        </b-container>
        <template>
          <div>
            <b-table hover
                     :items="disActivities"
                     striped
                     bordered
                     head-variant="dark"
            >
            </b-table>
          </div>
        </template>
      </b-container>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { maxLength, alpha, email, required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import sweetalert from 'sweetalert';
import ActivityList from "../components/ActivityList";
import createActivity from "../components/createActivity";

export default {
  data() {
    return {
      departments: [],
      disActivities: [],
      disActIds: [],
      profileData: {
        isCompany: false,
        isProfessor: false,
        firstname: "",
        lastname: "",
        email: "",
        description: "",
        position: "",
        companyname: "",
        department: "",
        areasinterest: [],
        activities: []
      },
      editProfileData: {
        firstname: "",
        lastname: "",
        email: "",
        description: "",
        position: "",
        companyname: "",
        department: "",
        activities: [],
        areasinterest: [],
      },
      loading: true
    };
  },
  validations: {
    //Validations for the inputs when editing profile info
    editProfileData: {
      firstname: {
        maxLength: maxLength(25)
      },
      lastname: {
        maxLength: maxLength(25)
      },
      department: {
        maxLength: maxLength(25)
      },
      position: {
        maxLength: maxLength(50)
      },
      email: {
        email,
        required
      }
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        tagname: newTag,
        tagid: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.editProfileData.areasinterest.push(tag);
    },
    createActivity(newAct) {
      this.loading = true;
      console.log(newAct);
      const userid = this.$route.params.id;
      const data_json = JSON.stringify({
          action: 'create',
          activity: newAct,
          userid: userid,
      });
      axios({
        url: "https://feather-ilp-back.herokuapp.com/Feather/editActsinProfile",
        data: data_json,
        method: "post"
      })
        .then(response => {
          if (response.data.company) {
            console.log("Se crapio esto")
          } else {
            this.profileData.isProfessor = true;
            this.profileData.firstname = response.data.firstname;
            this.profileData.lastname = response.data.lastname;
            this.profileData.position = response.data.acadposition;
            this.profileData.email = response.data.email;
            this.profileData.description = response.data.description;
            this.profileData.department = response.data.department;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
            this.disActivities = [];
            this.disActIds = [];
            for(let i=0; i<response.data.activities.length; i++){
              this.disActIds.push({'actid': response.data.activities[i]['actid']});
              this.disActivities.push({'Title': response.data.activities[i]['actname'], 'Range of Funds':response.data.activities[i]['fundrange'],
                'Description':response.data.activities[i]['description'], 'Date':response.data.activities[i]['actdate'], 'Ongoing':response.data.activities[i]['ongoing']});
            }
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
        sweetalert('Success!', 'Activity created!', 'success');
    },
    deleteActivity(actIndex) {
      this.loading = true;
      const userid = this.$route.params.id;
      const data_json = JSON.stringify({
        action: 'delete',
        actid: this.disActIds[actIndex],
        userid: userid,
      });
      axios({
        url: "https://feather-ilp-back.herokuapp.com/Feather/editActsinProfile",
        data: data_json,
        method: "post"
      })
        .then(response => {
          if (response.data.company) {
            console.log("Se crapio esto")
          } else {
            this.profileData.isProfessor = true;
            this.profileData.firstname = response.data.firstname;
            this.profileData.lastname = response.data.lastname;
            this.profileData.position = response.data.acadposition;
            this.profileData.email = response.data.email;
            this.profileData.description = response.data.description;
            this.profileData.department = response.data.department;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
            this.disActivities = [];
            this.disActIds = [];
            for(let i=0; i<response.data.activities.length; i++){
              this.disActIds.push(response.data.activities[i]['actid']);
              this.disActivities.push({'Title': response.data.activities[i]['actname'], 'Range of Funds':response.data.activities[i]['fundrange'],
                'Description':response.data.activities[i]['description'], 'Date':response.data.activities[i]['actdate'], 'Ongoing':response.data.activities[i]['ongoing']});
            }
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
    },
    showModalEditProfile() {
      this.editProfileData.firstname = this.profileData.firstname;
      this.editProfileData.lastname = this.profileData.lastname;
      this.editProfileData.position = this.profileData.position;
      this.editProfileData.email = this.profileData.email;
      this.editProfileData.description = this.profileData.description;
      this.editProfileData.department = this.profileData.department;
      if (this.profileData.areasinterest) {
        this.editProfileData.areasinterest = Array.from(
          this.profileData.areasinterest
        );
      }
      this.$bvModal.show("modalEditProfile");
    },
    cancelEdit() {
      this.editProfileData.firstname = this.profileData.firstname;
      this.editProfileData.lastname = this.profileData.lastname;
      this.editProfileData.position = this.profileData.position;
      this.editProfileData.department = this.profileData.department;
      this.editProfileData.email = this.profileData.email;
      this.editProfileData.description = this.profileData.description;
      this.$bvModal.hide("modalEditProfile");
    },
    editProfile() {
      if (this.$v.editProfileData.$anyError) {
        return;
      }
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to edit?", {
          title: "Confirmation",
          size: "sm",
          buttonSize: "sm",
          okVariant: "dark",
          cancelVariant: "secondary",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(confirm => {
          if (confirm) {
            var userid = localStorage.getItem("userid");
            const profile_info_edited = JSON.stringify({
              userid: userid,
              firstname: this.editProfileData.firstname,
              lastname: this.editProfileData.lastname,
              email: this.editProfileData.email,
              description: this.editProfileData.description,
              department: this.editProfileData.department,
              position: this.editProfileData.position,
              tags: this.editProfileData.areasinterest
            });
            console.log(profile_info_edited);
            this.profileData.firstname = this.editProfileData.firstname;
            this.profileData.lastname = this.editProfileData.lastname;
            this.profileData.position = this.editProfileData.position;
            this.profileData.department = this.editProfileData.department;
            this.profileData.email = this.editProfileData.email;
            this.profileData.description = this.editProfileData.description;
            this.profileData.areasinterest = this.editProfileData.areasinterest;
            this.$bvModal.hide("modalEditProfile");

            // axios({
            //   url: "https://feather-ilp-back.herokuapp.com/Feather/getprofilebyuserid/",
            //   data: data_json,
            //   method: "post"
            // })
            //   .then(response => {
            //     if (response.data.userid == userid) {
            //       this.profileData.firstname = this.editProfileData.firstname;
            //       this.profileData.lastname = this.editProfileData.lastname;
            //       this.profileData.position = this.editProfileData.position;
            //       this.profileData.department = this.editProfileData.department;
            //       this.profileData.email = this.editProfileData.email;
            //       this.profileData.description = this.editProfileData.description;
            //       this.profileData.areasinterest = this.editProfileData.areasinterest;
            //     }
            //     this.loading = false;
            //   })
            //   .catch(error => {
            //     console.log(`error: ${error}`);
            //   });
          }
        })
        .catch(err => {
          this.editProfileData.firstname = this.profileData.firstname;
          this.editProfileData.lastname = this.profileData.lastname;
          this.editProfileData.position = this.profileData.position;
          this.editProfileData.areasinterest = this.profileData.areasinterest;
          this.$bvModal.hide("modalEditProfile");
        });
    },
    getModalHeader() {
      return "Edit " + this.profileData.firstname + "s" + " information";
    },
    init() {
      //Populate Profile Information at start
      var userid = this.$route.params.id;
      axios({
        url: "https://feather-ilp-back.herokuapp.com/Feather/departments",
        method: "get"
      })
        .then(response => {
          this.departments = response.data;
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
      axios({
        url: "https://feather-ilp-back.herokuapp.com/Feather/getprofilebyuserid/" + userid,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.company) {
            this.profileData.isCompany = true;
            this.profileData.firstname = response.data.firstname;
            this.profileData.lastname = response.data.lastname;
            this.profileData.position = response.data.empposition;
            this.profileData.email = response.data.email;
            this.profileData.companyname = response.data.company;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
          } else {
            this.profileData.isProfessor = true;
            this.profileData.firstname = response.data.firstname;
            this.profileData.lastname = response.data.lastname;
            this.profileData.position = response.data.acadposition;
            this.profileData.email = response.data.email;
            this.profileData.description = response.data.description;
            this.profileData.department = response.data.department;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
            for(let i=0; i<response.data.activities.length; i++){
              this.disActIds.push(response.data.activities[i]['actid']);
              this.disActivities.push({'Title': response.data.activities[i]['actname'], 'Range of Funds':response.data.activities[i]['fundrange'],
                'Description':response.data.activities[i]['description'], 'Date':response.data.activities[i]['actdate'], 'Ongoing':response.data.activities[i]['ongoing']});
            }
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
    },
    editActivity(actIndex) {
      //Populate Profile Information at start
      let argus = actIndex;
      this.loading = true;
      const actid = this.disActIds[argus['actIndex']];
      const activity = this.profileData.activities[argus['actIndex']];
      const userid = this.$route.params.id;
      const data_json = JSON.stringify({
        action: 'edit',
        actid: actid,
        activity: activity,
        userid: userid,
      });
      axios({
        url: "https://feather-ilp-back.herokuapp.com/Feather/editActsinProfile",
        data: data_json,
        method: "post"
      })
        .then(response => {
          if (response.data.company) {
            console.log("Se crapio esto");
          } else {
            this.profileData.isProfessor = true;
            this.profileData.firstname = response.data.firstname;
            this.profileData.lastname = response.data.lastname;
            this.profileData.position = response.data.acadposition;
            this.profileData.email = response.data.email;
            this.profileData.description = response.data.description;
            this.profileData.department = response.data.department;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
            this.disActivities = [];
            this.disActIds = [];
            for(let i=0; i<response.data.activities.length; i++){
              this.disActIds.push(response.data.activities[i]['actid']);
              this.disActivities.push({'Title': response.data.activities[i]['actname'], 'Range of Funds':response.data.activities[i]['fundrange'],
                'Description':response.data.activities[i]['description'], 'Date':response.data.activities[i]['actdate'], 'Ongoing':response.data.activities[i]['ongoing']});
            }
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
    }
  },
  components: {
      ActivityList,
      createActivity,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.init();
      next();
    });
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
@import url("https://fonts.googleapis.com/css?family=Hind+Madurai:700|Josefin+Sans:400,700|Leckerli+One|Open+Sans:400,400i,600,600i,700,700i&display=swap");
.display-3 {
  font-size: 3rem;
}
.modal-content {
  border: 1px solid #efeef0;
}
.modal-body .input-group-text {
  background: #efeef0;
  color: #313e50;
}
.modal-title {
  font-family: "Open Sans", sans-serif;
}
.form-control:focus {
  border-color: #337137;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(51, 113, 55, 0.452);
  box-shadow: 0 0 0 0.2rem rgba(51, 113, 55, 0.452);
}
.svg-inline--fa {
  margin-right: 0.3rem;
}
p {
  font-family: "Open Sans", sans-serif;
}
#edit-btn-section {
  height: 0;
}
#edit-profile-btn {
  position: relative;
  top: -5px;
}
h2 {
  font-family: "Josefin Sans", sans-serif;
  font-size: 4rem;
  font-weight: bold;
}
/* .aboutme {
} */
.header-info {
  text-align: left;
}
.header-info h1 {
  font-family: "Josefin Sans", sans-serif;
  text-align: end;
}
.profile-position,
.area-of-interest {
  padding-left: 10px;
}
.profile-info {
  text-align: left;
  border-left: 1px solid #a8b2beb2;
  padding-left: 0;
}
.profile-info p {
  font-weight: 600;
  margin-bottom: 0;
}
.profile-info h4 {
  font-weight: 400;
  margin-bottom: 0.2rem;
  color: #a8b2be;
  font-size: 14px;
}
.profile-position {
  border-bottom: 1px solid #a8b2beb2;
  padding-bottom: 10px;
  width: 60%;
}
.jumbotron {
  padding: 1rem 1.5rem 1rem 1.5rem;
  background-color: #313e50;
  border-radius: 0;
  color: white;
}
.badges {
  text-align: left;
}
.badge {
  font-size: 12px;
  margin-right: 1rem;
}
.activities-header p {
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  font-size: 2.3rem;
  text-align: right;
  text-transform: capitalize;
}
.multiselect__select {
  display: none;
}
.multiselect__tag-icon:after {
  color: white;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #242e3b;
}
.multiselect__tag {
  background: #313e50;
}
</style>

