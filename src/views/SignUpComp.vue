<template>
  <div class="signupcomp">
    <b-container fluid class="text-center">
      <div class="mx-auto white-card rounded shadow mt-5">
        <h4>Welcome to ILP</h4>
        <b-container>
          <b-form @submit.stop.prevent="signupComp">
            <b-form-group>
              <b-input-group prepend="Email" class="mts-3">
                <b-form-input v-model="form.email" placeholder="Email" type="email"></b-form-input>
                <b-form-invalid-feedback id="email-input-feedback">Please enter a valid email</b-form-invalid-feedback>
              </b-input-group>
              <b-input-group prepend="Password" class="mt-3">
                <b-form-input v-model="form.pw" placeholder="Password" type="password"></b-form-input>
              </b-input-group>
              <b-input-group prepend="First Name" class="mt-3">
                <b-form-input v-model="form.firstName" placeholder="First Name" type="text"></b-form-input>
              </b-input-group>
              <b-input-group prepend="Last Name" class="mt-3">
                <b-form-input v-model="form.lastName" placeholder="Last Name" type="text"></b-form-input>
              </b-input-group>
              <b-input-group prepend="Position" class="mt-3">
                <b-form-input v-model="form.position" placeholder="Position" type="text"></b-form-input>
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
                    <template>
                      <!-- object value -->
                      <model-select :options="options"
                                    v-model="form.compName"
                                    placeholder="select item">
                      </model-select>
                    </template>
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
                <b-form-input v-model="form.compName" placeholder="Company Name" type="text"></b-form-input>
              </b-input-group>
              <b-button v-on:click="signupComp" variant="warning" class="mt-4">Sign Up</b-button>
            </b-form-group>
          </b-form>
        </b-container>
      </div>
    </b-container>
  </div>
</template>

<script>
    import { validationMixin } from "vuelidate"
    import { required, minLength, email } from "vuelidate/lib/validators"
  //import { ModelSelect } from 'vue-search-select'

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
                    pw: '',
                    firstName: '',
                    lastName: '',
                    position: '',
                    compName: '',
                },
                validations: {
                    form: {
                        email: {
                            required,
                            email
                        },
                        pw: {
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
            };
        },
        methods: {
            signupComp: function (event) {
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    return;
                } else {
                this.$http.post('http://localhost:5000/Feather/company/signup/', {

                    }).then(function (data) {
                        console.log(data);
                    });
                }
            },
            reset () {
                this.item = {}
            },
            selectFromParentComponent1 () {
                // select option from parent component
                this.item = this.options[0]
            },
            reset2 () {
                this.item2 = ''
            },
            selectFromParentComponent2 () {
                // select option from parent component
                this.item2 = this.options2[0].value
            },
        },
        components: {
            //ModelSelect
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
    background: #026670;
  }
</style>
