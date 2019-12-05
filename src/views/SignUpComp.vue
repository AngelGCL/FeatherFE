<template>
  <div class="signupcomp">
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
          <b-form @submit.stop.prevent="verify">
            <b-form-group>
              <b-input-group prepend="Email" class="mts-3">
                <b-form-input placeholder="Email"
                              v-model="$v.form.email.$model"
                              :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
                              aria-describedby="email-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="email-input-feedback">Please enter a valid email</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Password" class="mt-3">
                <b-form-input placeholder="Password"
                              type="password"
                              v-model="$v.form.password.$model"
                              :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
                              aria-describedby="password-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="password-input-feedback">Please enter a valid password</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="First Name" class="mt-3">
                <b-form-input placeholder="First Name"
                              v-model="$v.form.firstName.$model"
                              :state="$v.form.firstName.$dirty ? !$v.form.firstName.$error : null"
                              aria-describedby="firstName-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="firstName-input-feedback">Please enter your first name</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Last Name" class="mt-3">
                <b-form-input placeholder="Last Name"
                              v-model="$v.form.lastName.$model"
                              :state="$v.form.lastName.$dirty ? !$v.form.lastName.$error : null"
                              aria-describedby="lastName-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="lastName-input-feedback">Please enter your last name</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Position" class="mt-3">
                <b-form-input placeholder="Position"
                              v-model="$v.form.position.$model"
                              :state="$v.form.position.$dirty ? !$v.form.position.$error : null"
                              aria-describedby="position-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="position-input-feedback">Please enter your position</b-form-invalid-feedback>
              </b-input-group>
              <!--Modal button to search company-->
              <template>
                <b-button @click="$bvModal.show('modal-scoped')">Search for Company</b-button>
                <b-modal id="modal-scoped">
                  <template v-slot:modal-header="{ close }">
                    <h5>Search for your company.</h5>
                  </template>
                  <template v-slot:default="{ hide }">
                   <!-- search bar -->
                    <model-select :options="options"
                                  v-model="form.compName"
                                  placeholder="select item">
                    </model-select>
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
              <b-input-group prepend="Company" class="mt-3">
                <b-form-input placeholder="Company Name" type="text"
                              v-model="$v.form.compName.$model"
                              :state="$v.form.compName.$dirty ? !$v.form.compName.$error : null"
                              aria-describedby="company-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="company-input-feedback">Please enter your company's official name</b-form-invalid-feedback>
              </b-input-group>
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
            <b-button v-on:click.self="verify" variant="warning" class="mt-4">Sign Up</b-button>
          </b-form>
        </b-container>
      </div>
    </b-container>
  </div>
</template>

<script>
    import { validationMixin } from "vuelidate";
    import { required, minLength, email } from "vuelidate/lib/validators";
    import createTag from "../components/createTag";
    import TagList from "../components/TagList";
    import { ModelSelect } from 'vue-search-select';
    import sweetalert from 'sweetalert';

    export default {
      mixins: [validationMixin],
      data() {
          return {
              //value sets the value of the option chosen, text is the displayed text of the option
              options: [
                  { value: 'Orion', text: 'Orion' },
                  { value: 'Santander', text: 'Santander' },
                  { value: 'Asus', text: 'Asus' },
                  { value: 'Square Enix', text: 'Square Enix' },
                  { value: 'Dell', text: 'Dell' }
              ],
              form: {
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  position: '',
                  compName: '',
              },
              tags: [],
              randnum: '',
              valcode: '',
              isVerifying: false,
          };
      },
      watch: {
        'tagged': function() {return this.$store.state.create_tag;}
      },
      validations: {
          form: {
              email: {
                  required,
                  email
              },
              password: {
                  required
              },
              firstName: {
                  required
              },
              lastName: {
                  required
              },
              position: {
                  required
              },
              compName: {
                  required
              }
          },
        },
        methods: {
            verify: function () {
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    sweetalert('Error', 'Please fill in all required fields.', 'error');
                } else {
                    const ver_data = JSON.stringify({
                        email: this.form.email,
                        firstname: this.form.firstName,
                        lastname: this.form.lastName,
                    });
                    this.$http.post('http://localhost:5000/Feather/signup/verification', ver_data, {
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(
                        response => {
                            this.randnum = response.data['Code'];
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
                        firstname: this.form.firstName,
                        lastname: this.form.lastName,
                        position: this.form.position,
                        compname: this.form.compName,
                        tags: this.tags,
                    });
                    this.$http.post('http://localhost:5000/Feather/company/signup', data_json, {
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(response => {
                            this.isVerifying = false;
                            this.$router.push('/signin')
                    },
                        error => {
                            sweetalert('Error', 'Something went wrong.', 'error');
                        });
                }
            },
            createTag: function(newTag) {
                this.tags.push(newTag);
                console.log(this.tags);
            },
        },
        components: {
            ModelSelect,
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
