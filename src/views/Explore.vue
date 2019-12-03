 <template>
   <div class="explore">


     <b-form>
       <div class="search-input mx-auto mt-4">
         <b-input-group class="mb-3">
           <b-form-input v-model="form.search" size="lg" placeholder="Search"></b-form-input>
           <b-input-group-append>
             <b-button @click="onSubmit" variant="dark">
              <font-awesome-icon class="input-icon" icon="search" />
             </b-button>
           </b-input-group-append>
         </b-input-group>
       </div>


       <!-- <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
         <b-form-select class="mb-2 mr-sm-2 mb-sm-0" v-model="form.filter"
           :options="[{ value:'professors',text: 'Professors'}, {value:'companies',text: 'Companies' }]"
           id="inline-form-custom-select-pref">
         </b-form-select>

         <label class="mr-sm-2" for="inline-form-custom-select-pref">Tags</label>
         <b-form-select class="mb-2 mr-sm-2 mb-sm-0" v-model="form.tag" :options="form.tags"
           id="inline-form-custom-select-pref">
         </b-form-select>

         <b-button @click="onSubmit" variant="primary">Search</b-button> -->

     </b-form>


     <div v-show="loading && search">
       <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
     </div>
     <div class="w-50 mx-auto">
       <b-alert variant="danger" dismissible :show="searchError" @dismissed="searchError=false">No
         results</b-alert>
     </div>
     <div v-show="!loading && rows>0">
       <b-pagination v-model="pagination.currentPage" :total-rows="pagination.rows"
         :per-page="pagination.perPage" aria-controls="my-table" align="center"></b-pagination>

       <p class="mt-3">Current Page: {{ pagination.currentPage }}</p>

       <b-table id="my-table" :items="pagination.items" :per-page="pagination.perPage"
         :current-page="pagination.currentPage" :hover="true" :fields="pagination.fields" small>
         <template v-slot:cell(id)="row">
           <b-link :to="{ name: 'profile', params: { id:row.item.id } }">Link</b-link>
         </template>


       </b-table>

     </div>
   </div>
 </template>
 <style scoped>

 </style>

 <script>
   import Vue from "vue";
   import axios from "axios";

   export default {
     data() {
       return {
         loading: true,
         search: false,
         searchError: false,
         pagination: {
           fields: [],
           items: [],
           perPage: 3,
           currentPage: 1,
         },
         form: {
           search: '',
           filter: '',
           tag: null,
           tags: [],
         }


       };
     },
     computed: {
       rows() {
         return this.pagination.items.length;
       }
     },
     methods: {
       onSubmit() {
         this.search = true;
         this.searchError = false;
         this.loading = true;
         console.log("Aprete el boton de Search!");
         //Populate Profile Information at start

         var userid = this.$route.params.id;
         var token = localStorage.getItem("token");
         //Cosntruct URL with parameters chosen in Frontend!

         axios.get("https://feather-ilp-back.herokuapp.com/Feather/search", {
             params: {
               q: this.form.search,
               profiletype: this.form.filter,
               tag: this.form.tag,
             }
           })
           .then(response => {
             console.log('Entre al search');
             console.log(response);
             this.loading = false;
             this.searchError = false;
             this.pagination.fields = [];
             this.pagination.items = response.data;

             console.log(response.data[0].department)
             let field = null;
             if (response.data[0].department) {
               field = {
                 key: 'department',
                 label: 'Department',
                 sortable: true
               };
             } else {
               field = {
                 key: 'company',
                 label: 'Company',
                 sortable: true
               };
             }
             let initialFields = [{
                 key: 'id',
                 label: 'Profile Page',
               },
               {
                 key: 'first_name',
                 label: 'First Name',
                 sortable: true
               },
               {
                 key: 'last_name',
                 label: 'Last Name',
                 sortable: true
               },
               {
                 key: 'position',
                 label: 'Position',
                 sortable: true
               },
             ];
             console.log("Initial Fields:");
             this.pagination.fields = initialFields;
             this.pagination.fields.push(field);
             //console.log(this.pagination.fields);
           })
           .catch(error => {
             this.resetVariables();
             this.searchError = true;
             this.loading = false;


             console.log(`error: ${error}`);
           });
       },
       init() {
         //Get all tags in the database
         axios({
             url: "https://feather-ilp-back.herokuapp.com/Feather/tags",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
               this.form.tags.push({
                 value: response.data[i].id,
                 text: response.data[i].tagname
               });
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
       },
       resetVariables() {
         this.pagination.fields = [];
         this.pagination.items = [];

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
 <style>
   .input-icon {
     font-size: 18px;
   }
   .search-input{
     width: 60%;
   }
   .form-control:focus {
     border-color: #337137;
     outline: 0;
     -webkit-box-shadow: 0 0 0 0.2rem rgba(51, 113, 55, 0.452);
     box-shadow: 0 0 0 0.2rem rgba(51, 113, 55, 0.452);
   }

   span.page-link {
     border-radius: 15px;
     margin: 0px 10px;
   }

   a.page-link {
     border-radius: 15px;
   }

   .page-item.active .page-link {
     z-index: 1;
     color: #fff;
     background-color: #313e50;
     border-color: #5c6672;
   }

 </style>
