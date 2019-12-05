 <template>
   <div class="adminpanel">
    <b-jumbotron header="Admin Panel">
    <p>On this page you can find different visualizations that may aid you analize the data store on the Website.</p>
    <p>You may also give privileges to other users to be admin and acces this page.</p>
  </b-jumbotron>
  <div v-show="loading">
       <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
     </div>

  <div v-show="!loading">
  <b-container class="bv-example-row">
  <b-row>
    <b-col>
      <GChart
    type="ColumnChart"
    :data="chart1Data"
    :options="chart1Options"
  />
    </b-col>
    <b-col>
       <GChart
    type="ColumnChart"
    :data="chart2Data"
    :options="chart2Options"
  />
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <GChart
    type="ColumnChart"
    :data="chart3Data"
    :options="chart3Options"
  />
    </b-col>
    <b-col>
       <GChart
    type="ColumnChart"
    :data="chart4Data"
    :options="chart4Options"
  />
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <GChart
    type="PieChart"
    :data="chart5Data"
    :options="chart5Options"
  />
    </b-col>
    <b-col>
       <GChart
    type="PieChart"
    :data="chart6Data"
    :options="chart6Options"
  />
    </b-col>
  </b-row>
</b-container>
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
        chart1Data: [
          ['Date', 'Quantity'],
        ],
        chart1Options: {
            title: "Created Users Accounts Per Month",
            legend: {position: 'none'}
        },
        chart2Data: [
          ['Date', 'Quantity'],
        ],
        chart2Options: {
            title: "Updated Users Accounts Per Month",
            legend: {position: 'none'}
        },
        chart3Data: [
          ['Date', 'Quantity'],
        ],
        chart3Options: {
            title: "Created Professors Accounts Per Month",
            legend: {position: 'none'}
        },
        chart4Data: [
          ['Date', 'Quantity'],
        ],
        chart4Options: {
            title: "Updated Professors Accounts Per Month",
            legend: {position: 'none'}
        },
        chart5Data: [
          ['Department', 'Quantity'],
        ],
        chart5Options: {
            title: "Total User Accounts Per Department",
            legend: {position: 'none'}
        },
        chart6Data: [
          ['Company', 'Quantity'],
        ],
        chart6Options: {
            title: "Total User Accounts Per Company",
            legend: {position: 'none'}
        },
        loading: true,
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

         axios.get("http://localhost:5000/Feather/search", {
             params: {
               q: this.form.search,
               profiletype: this.form.radioSelected,
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
        this.loading = true;
         axios({
             url: "http://localhost:5000/Feather/chart/1",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i].date);
               this.chart1Data.push([
                 response.data[i].date,
                 response.data[i].qty
               ]);
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
           axios({
             url: "http://localhost:5000/Feather/chart/2",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i].date);
               this.chart2Data.push([
                 response.data[i].date,
                 response.data[i].qty
               ]);
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
           axios({
             url: "http://localhost:5000/Feather/chart/3",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i].date);
               this.chart3Data.push([
                 response.data[i].date,
                 response.data[i].qty
               ]);
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
           axios({
             url: "http://localhost:5000/Feather/chart/4",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i].date);
               this.chart4Data.push([
                 response.data[i].date,
                 response.data[i].qty
               ]);
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
           axios({
             url: "http://localhost:5000/Feather/chart/5",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i].date);
               this.chart5Data.push([
                 response.data[i].department,
                 response.data[i].qty
               ]);
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
           axios({
             url: "http://localhost:5000/Feather/chart/6",
             method: "get"
           })
           .then(response => {
             for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i].date);
               this.chart6Data.push([
                 response.data[i].department,
                 response.data[i].qty
               ]);
             }
           })
           .catch(error => {
             console.log(`error: ${error}`);
           });
           this.loading = false;
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
