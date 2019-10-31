<template>
  <div class="signupprof">
    <b-container fluid class="text-center">
      <div class="mx-auto white-card rounded shadow mt-5">
        <h4>Welcome to ILP</h4>
        <b-container>
          <b-form @submit.stop.prevent="signupProf">
            <b-form-group>
              <b-input-group prepend="Email" class="mts-3">
                <b-form-input v-model="userInput.email" placeholder="Email" type="email"></b-form-input>
              </b-input-group>
              <b-input-group prepend="Password" class="mt-3">
                <b-form-input v-model="userInput.pw" placeholder="Password" type="password"></b-form-input>
              </b-input-group>

              <b-input-group>
                <b-input-group-prepend>
                  <b-button variant="outline-info">Button</b-button>
                </b-input-group-prepend>

                <b-form-input type="number" min="0.00"></b-form-input>

                <b-input-group-append>
                  <b-button variant="outline-secondary">Button</b-button>
                  <b-button variant="outline-secondary">Button</b-button>
                </b-input-group-append>
              </b-input-group>

              <template>
                <b-button @click="$bvModal.show('modal-name')">Search for Department</b-button>
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
                <b-form-input v-model="userInput.firstName" placeholder="First Name" type="text"></b-form-input>
              </b-input-group>
              <b-input-group prepend="Last Name" class="mt-3">
                <b-form-input v-model="userInput.lastName" placeholder="Last Name" type="text"></b-form-input>
              </b-input-group>
              <!--Modal button to search for department-->
              <template>
                <b-button @click="$bvModal.show('modal-scoped')">Search for Department</b-button>
                <b-modal id="modal-scoped">
                  <template v-slot:modal-header="{ close }">
                    <h5>Search for your Department.</h5>
                  </template>
                  <template v-slot:default="{ hide }">
                    <!-- search bar -->
                    <template>
                      <!-- object value -->
                      <model-select :options="options"
                                    v-model="userInput.department"
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
              <b-input-group prepend="Department" class="mt-3">
                <b-form-input v-model="userInput.department" placeholder="Company Name" type="text"></b-form-input>
              </b-input-group>
              <b-button v-on:click="signupProf" variant="warning" class="mt-4">Sign Up</b-button>
            </b-form-group>
          </b-form>
        </b-container>
      </div>
    </b-container>
  </div>
</template>

<script>
    /* eslint-disable */
    import { ModelSelect } from 'vue-search-select'
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    export default {
        mixins: [validationMixin],
        data() {
            return {
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
                userInput: {
                    email: '',
                    pw: '',
                    firstName: '',
                    lastName: '',
                    department: '',

                },
                validations: {
                    userInput: {
                        email: {
                            required
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
                //for name search
                name_data:{
                    firstname: '',
                    lastname: '',
                },
            };
        },
        methods: {
            signupProf: function (event) {
                if (this.userInput.email === '' || this.userInput.pw === '' || this.userInput.department === '' || this.userInput.lastName === ''
                    || this.userInput.firstName === '' ) {
                    alert('MALO MALO');
                } else {
                    this.$http.post('http://localhost:5000/Feather/company/signup/', {

                    }).then(function (data) {
                        console.log(data);
                    });
                }
            },
            searchName: function() {
                const data_json = JSON.stringify({
                    firstname: this.name_data.firstname,
                    lastname: this.name_data.lastname
                });
                this.$http.get('http://localhost:5000/Feather/professor/signup/findname', data_json, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(`error: ${error}`);
                    });
            }
        },
        components: {
            ModelSelect
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
