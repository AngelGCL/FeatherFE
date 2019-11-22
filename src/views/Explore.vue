 <template>
  <div class="explore">


    <b-form inline>
        <div class="search-inputs mx-auto mb-5 mt-5">
    <b-form-input
      id="inline-form-input-search"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Search..."
      v-model="form.search"
    ></b-form-input>

    <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="form.filter"
      :options="[{ value:'professors',text: 'Professors'}, {value:'companies',text: 'Companies' }]"
      id="inline-form-custom-select-pref"
    >
    </b-form-select>




    <b-button @click="onSubmit"  variant="primary">Search</b-button>
    </div>
    </b-form>

    <div v-show="loading && search">
          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>
	<div v-show="!loading">
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="pagination.rows"
      :per-page="pagination.perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ pagination.currentPage }}</p>

    <b-table
      id="my-table"
      :items="pagination.items"
      :per-page="pagination.perPage"
      :current-page="pagination.currentPage"
      :hover="true"
      :fields="pagination.fields"
      small

    ></b-table>
    </div>



  </div>
</template>
<style scoped>
    .search-inputs{
        display: inline-flex;

    }
</style>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  data() {
    return {
        loading: true,
        search: false,
    	pagination: {
            fields: [],
	    	items: [],
	    	perPage: 3,
	    	currentPage: 1,
		},
		form: {
			search: '',
			filter: '',
		}

    };
  },
  computed: {
      rows() {
        return this.pagination.items.length
      }
   },
  methods: {
    onSubmit() {
        this.search = true;
        this.loading = true;
        console.log("Aprete el boton de Search!");
        //Populate Profile Information at start
      var userid = this.$route.params.id;
      var token = localStorage.getItem("token");
      //Cosntruct URL with parameters chosen in Frontend!


      axios({
        url: "http://localhost:5000/Feather/search?profiletype=" + this.form.filter,
        method: "get"
      })
        .then(response => {
            console.log("Entre al then");
            this.loading = false;
            this.pagination.fields = [];
            this.pagination.items = response.data;

            console.log(response.data[0].department)
            let field = null;
            if (response.data[0].department){
                field = {
                    key: 'department',
                    label: 'Department',
                    sortable: true
                };
            }else{
                field = {
                    key: 'company',
                    label: 'Company',
                    sortable: true
                };
            }
            let initialFields = [
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
            console.log(this.pagination.fields);
        })
        .catch(error => {
            this.loading = false;
          console.log(`error: ${error}`);

        });
    },
    init() {
      //Get all avaialbe tags in the database

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

