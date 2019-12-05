<template>
  <div class="signupprof">
    <b-container fluid class="text-center">
      <div class="mx-auto white-card rounded shadow mt-5" v-show="isVerifying">
        <h4>Validation</h4>
        <b-container>
          <b-form @submit.stop="signup">
            <b-form-group>
              <b-input-group class="mts-3">
                <b-form-input placeholder="Valid Code"
                              v-model="valcode"
                              type="text"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-form>
          <div>
            <b-button v-on:click="signup" variant="warning" class="mt-4">Validate</b-button>
          </div>
        </b-container>
      </div>
      <div class="mx-auto white-card rounded shadow mt-5" v-show="!isVerifying">
        <h4>Welcome to ILP</h4>
        <b-container>
          <b-form @submit.stop="verify">
            <b-form-group>
              <b-input-group prepend="Email" class="mts-3">
                <b-form-input placeholder="Email"
                              v-model="$v.form.email.$model"
                              :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
                              aria-describedby="email-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="email-input-feedback">Please enter your email</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Password" class="mt-3">
                <b-form-input placeholder="Password"
                              type="password"
                              v-model="$v.form.password.$model"
                              :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
                              aria-describedby="password-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="password-input-feedback">Please enter your password</b-form-invalid-feedback>
              </b-input-group>
              <template>
                <b-button @click="$bvModal.show('modal-name')">Search for Name</b-button>
                <!--NEED TO SHOW RESULT OF SEARCH-->
                <b-modal id="modal-name">
                  <template v-slot:modal-header="{ close }">
                    <h5>Search for your name.</h5>
                  </template>
                  <template v-slot:default="{ hide }">
                    <b-input-group>
                      <b-form-input type="text" placeholder="First Name" v-model="name_data.firstname"></b-form-input>
                      <b-form-input type="text" placeholder="Last Name" v-model="name_data.lastname"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-secondary" @click="searchName">Search</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </template>
                  <template v-slot:modal-footer="{ cancel, ok }">
                    <b-button size="sm" variant="success" @click="ok()">
                      Submit
                    </b-button>
                    <b-button size="sm" variant="danger" @click="cancel()">
                      Cancel
                    </b-button>
                  </template>
                </b-modal>
              </template>
              <b-input-group prepend="First Name" class="mt-3">
                <b-form-input placeholder="First Name"
                              v-model="$v.form.firstname.$model"
                              :state="$v.form.firstname.$dirty ? !$v.form.firstname.$error : null"
                              aria-describedby="firstName-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="firstName-input-feedback">Please enter your First Name</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Last Name" class="mt-3">
                <b-form-input placeholder="Last Name"
                              v-model="$v.form.lastname.$model"
                              :state="$v.form.lastname.$dirty ? !$v.form.lastname.$error : null"
                              aria-describedby="lastName-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="lastName-input-feedback">Please enter your last Name</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group class="mt-3">
                <template>
                  <!-- object value -->
                  <model-select :options="options"
                                v-model="$v.form.department.$model"
                                :state="$v.form.department.$dirty ? !$v.form.department.$error : null"
                                aria-describedby="department-input-feedback"
                                placeholder="Search Department">
                  </model-select>
                </template>
                <b-form-invalid-feedback id="department-input-feedback">Please enter your department</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Position" class="mt-3">
                <b-form-input placeholder="Your position as faculty"
                              v-model="$v.form.acadpos.$model"
                              :state="$v.form.acadpos.$dirty ? !$v.form.acadpos.$error : null"
                              aria-describedby="acadpos-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="acadpos-input-feedback">Please enter your position</b-form-invalid-feedback>
              </b-input-group>
              <div>
                <b-button class="mt-4" v-b-toggle.collapse-1 variant="primary">Add Activities</b-button>
                <b-collapse id="collapse-1" class="mt-2">
                  <div class='ui three column centered grid'>
                    <div class='column'>
                      <activity-list v-bind:activities="activities"></activity-list>
                      <create-activity v-on:create-activity="createActivity"></create-activity>
                    </div>
                  </div>
                </b-collapse>
              </div>
              <div>
                <b-button class="mt-4" v-b-toggle.collapse-2 variant="primary">Add Area of Interests</b-button>
                <b-collapse id="collapse-2" class="mt-2">
                  <div class='ui three column centered grid'>
                    <div class='column'>
                      <b-row class="tags-area">
                        <tag-list v-bind:tags="tags"></tag-list>
                      </b-row>
                      <create-tag v-on:create-tag="createTag"></create-tag>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </b-form-group>
          </b-form>
          <div>
            <b-button v-on:click="verify" variant="warning" class="mt-4">Sign Up</b-button>
          </div>
        </b-container>
      </div>
    </b-container>
  </div>
</template>

<script>
    /* eslint-disable */
    import { ModelSelect } from 'vue-search-select';
    import { validationMixin } from "vuelidate";
    import { required, email, } from "vuelidate/lib/validators";
    import sweetalert from 'sweetalert';
    import ActivityList from "../components/ActivityList";
    import createActivity from "../components/createActivity";
    import createTag from "../components/createTag";
    import TagList from "../components/TagList";

    export default {
        mixins: [validationMixin],
        data() {
            return {
                activities: [],
                tags: [],
                //value sets the value of the option chosen, text is the displayed text of the option
                options: [
                    { value: 'ICOM', text: 'ICOM' },
                    { value: 'INEL', text: 'INEL' },
                    { value: 'CIIC', text: 'CIIC' },
                    { value: 'INSO', text: 'INSO' },
                    { value: 'INQU', text: 'INQU' }
                ],
                item: {
                    value: '',
                    text: ''
                },
                form: {
                    email: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    department: '',
                    acadpos: ''
                },
                //for name search
                name_data:{
                    firstname: '',
                    lastname: '',
                },
                arr: [],
                Val: 0,
                randnum: '',
                isVerifying: false,
                valcode: '',
            };
        },
        validations: {
            form: {
                email: {
                    required,
                    email,
                },
                password: {
                    required
                },
                firstname: {
                    required
                },
                lastname: {
                    required
                },
                department: {
                    required
                },
                acadpos: {
                    required
                }
            },
            valcode: {
                required,
            }
        },
        methods: {
            verify: function () {
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    sweetalert('Error', 'Please fill in all required fields.', 'error');
                } else {
                    const ver_data = JSON.stringify({
                        email: this.form.email,
                        firstname: this.form.firstname,
                        lastname: this.form.lastname,
                    });
                    this.$http.post('http://localhost:5000/Feather/signup/verification', ver_data, {
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(
                        response => {
                            this.randnum = response.data['Code'];
                            console.log('code=' + this.randnum);
                            this.isVerifying = true;
                        },
                        error => {
                            sweetalert('Error', 'Something went wrong.', 'error');
                        },
                    );
                }
            },
            signup: function () {
                if (this.valcode.toString() !== this.randnum.toString()) {
                    sweetalert('Error', 'Please fill in all required fields.', 'error');
                } else {
                    const data_json = JSON.stringify({
                        email: this.form.email,
                        password: this.form.password,
                        firstname: this.form.firstname,
                        lastname: this.form.lastname,
                        department: this.form.department,
                        acadpos: this.form.acadpos,
                        tags: this.tags,
                        activities: this.activities,
                        Val: this.Val
                    });
                    this.$http.post('http://localhost:5000/Feather/professor/signup', data_json,{
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(
                      response => {
                          this.isVerifying = false;
                          console.log('Success');
                          this.$router.push('/signin');
                      },
                        error => {
                          sweetalert('Error', 'Something went wrong.', 'error');
                        },
                    );
                }
            },
            searchName: function() {
                this.$http.get('http://localhost:5000/Feather/professor/signup/findname'+'/'+this.name_data.firstname+'/'
                    +this.name_data.lastname, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        this.arr.push(response.data['Professor']);
                        this.Val = response.data['Val'];
                        console.log(this.arr);
                        this.form.acadpos = this.arr[0]['acadpos'];
                        this.form.firstname = this.arr[0]['firstname'];
                        this.form.lastname = this.arr[0]['lastname'];
                        this.form.department = this.arr[0]['depid'][0];
                    })
                    .catch(error => {
                        console.log(`error: ${error}`);
                    });
            },
            convertDepId(depid){
                if (depid === '1'){
                    return 'ICOM';
                }
            },
            convertDepartment(department){
                if (department === 'ICOM'){
                    return '1';
                }
            },
            createActivity(newAct) {
                this.activities.push(newAct);
                sweetalert('Success!', 'Activity created!', 'success');

                console.log(this.activities);
            },
            createTag(newTag) {
                this.tags.push(newTag);
                console.log(this.tags);
            },
        },
        components: {
            ModelSelect,
            ActivityList,
            createActivity,
            TagList,
            createTag,
        },
    };
</script>

<style scoped>
  .btn {
    background: #fad54e;
    color: inherit;
  }
  h4 {
    color: white;
  }
  .white-card {
    width: 450px;
    background: #337137;
  }
  .tags-area{
    background-color: #9cb99d;
    margin-right: 0px;
    margin-left: 0px;
  }
</style>
