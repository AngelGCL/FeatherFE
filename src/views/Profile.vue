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
                <b-col>
                  <h4>
                    <font-awesome-icon icon="suitcase" />Position
                  </h4>
                  <p>
                    <span>{{profileData.position}}</span>
                    <span v-show="profileData.isCompany">at {{profileData.companyname}}</span>
                  </p>
                </b-col>
                <b-col>
                  <div v-show="profileData.isProfessor">
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
                <b-input-group-prepend is-text>Employee Position</b-input-group-prepend>
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
              <b-input-group>
                <b-input-group-prepend is-text>Department</b-input-group-prepend>
                <b-form-input
                  id="editposition-input"
                  v-model="$v.editProfileData.department.$model"
                  :state="$v.editProfileData.department.$dirty ? !$v.editProfileData.department.$error : null"
                  aria-describedby="editdepartment-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="editdepartment-feedback">Do not exceed 25 characters</b-form-invalid-feedback>
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
        <div class="activities-header">
          <h3>Activities</h3>
        </div>
        <div class="badges mt-1 mb-4">
          <div>
            <b-badge
              v-for="activity in profileData.activities"
              :key="activity.actid"
              variant="secondary"
            >{{activity.actname}}</b-badge>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { maxLength, alpha } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      profileData: {
        isCompany: false,
        isProfessor: false,
        firstname: "",
        lastname: "",
        position: "",
        companyname: "",
        department: "",
        areasinterest: [],
        activities: []
      },
      editProfileData: {
        firstname: "",
        lastname: "",
        position: "",
        companyname: "",
        department: "",
        areasinterest: [],
        activities: []
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
    showModalEditProfile() {
      this.editProfileData.firstname = this.profileData.firstname;
      this.editProfileData.lastname = this.profileData.lastname;
      this.editProfileData.position = this.profileData.position;
      this.editProfileData.department = this.profileData.department;
      this.editProfileData.areasinterest = Array.from(
        this.profileData.areasinterest
      );
      this.$bvModal.show("modalEditProfile");
    },
    cancelEdit() {
      this.editProfileData.firstname = this.profileData.firstname;
      this.editProfileData.lastname = this.profileData.lastname;
      this.editProfileData.position = this.profileData.position;
      this.editProfileData.department = this.profileData.department;
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
            this.$bvModal.hide("modalEditProfile");
            this.profileData.firstname = this.editProfileData.firstname;
            this.profileData.lastname = this.editProfileData.lastname;
            this.profileData.position = this.editProfileData.position;
            this.profileData.department = this.editProfileData.department;
            this.profileData.areasinterest = this.editProfileData.areasinterest;
            //this.loading = true;
            // var userid = localStorage.getItem("userid");
            // const profile_info_edited = JSON.stringify({
            //   userid: userid,
            //   firstname: this.editProfileData.firstname,
            //   lastname: this.editProfileData.lastname,
            //   department: this.editProfileData.department,
            //   position: this.editProfileData.position,
            //   tags: this.editProfileData.areasinterest
            // });
            // console.log(profile_info_edited);
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
            this.profileData.companyname = response.data.company;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
          } else {
            this.profileData.isProfessor = true;
            this.profileData.firstname = response.data.firstname;
            this.profileData.lastname = response.data.lastname;
            this.profileData.position = response.data.acadposition;
            this.profileData.department = response.data.department;
            this.profileData.areasinterest = response.data.tags;
            this.profileData.activities = response.data.activities;
          }
          this.loading = false;
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
.activities-header h3 {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0;
  font-weight: bold;
  text-align: left;
  margin-bottom: 0;
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

