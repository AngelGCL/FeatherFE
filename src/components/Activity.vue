<template>
  <div class="tagsandacts">
    <b-container fluid class="text-center">
      <div v-show="!isEditing">
        <div>
          <b-card no-body class="colum-1" border-variant="dark">
            <b-container class="bv-example-row">
              <table class="activity-table">
                <tr class="headers">
                  <th>Title</th>
                  <th>Date</th>
                  <th>Range of Funds</th>
                  <th>Ongoing</th>
                  <th rowspan="4"><b-button class="right floated edit icon" size="sm" v-on:click="showForm" squared>
                    <font-awesome-icon icon="edit"/>Edit
                  </b-button>
                    <b-button class="right floated trash icon" size="sm" variant="danger" v-on:click="deleteAct(activity)" squared>
                      <font-awesome-icon icon="trash-alt"/>
                    </b-button></th>
                </tr>
                <tr class="data-row">
                  <td>{{activity.actname}}</td>
                  <td>{{activity.actdate}}</td>
                  <td>{{activity.fundrange}}</td>
                  <td>{{activity.ongoing}}</td>
                </tr>
                <tr class="description-head">
                  <th colspan="4">Description</th>
                </tr>
                <tr class="description-row">
                  <td colspan="4">{{activity.description}}</td>
                </tr>
              </table>
            </b-container>
          </b-card>
        </div>
      </div>
    </b-container>
    <div class="content" style="background-color: white" v-show="isEditing">
      <b-input-group class="mts-3">
        <b-row>
          <b-col>
            <label style="background-color: white">Title</label>
            <b-form-input v-model="activity.actname" type="text"></b-form-input>
          </b-col>
          <b-col>
            <label style="background-color: white">Date</label>
            <date-picker name="date" v-model="activity.actdate" :config="config"></date-picker></b-col>
          <b-col>
            <label style="background-color: white">Funding</label>
            <b-form-select v-model="activity.fundrange" :options="options"></b-form-select></b-col>
          <b-col>
            <label style="background-color: white">Ongoing</label>
            <b-form-checkbox v-model="activity.ongoing"></b-form-checkbox></b-col>
        </b-row>
        <b-row>
          <b-col>
            <label style="background-color: white">Description</label>
            <b-form-textarea v-model="activity.description" type="text"></b-form-textarea>
          </b-col>
          <b-button variant="secondary" v-on:click="hideForm(activity)">Save</b-button>
        </b-row>
      </b-input-group>
    </div>
  </div>
</template>

<script>
    import datePicker from 'vue-bootstrap-datetimepicker';
    export default {
        props: ['activity'],
        data() {
            return {
                isEditing: false,
                options: [
                  { value: '-$5k', text: '-$5k' },
                  { value: '$5k - $10k', text: '$5k - $10k' },
                  { value: '+$10k', text: '+$10k' },
                  { value: 'Fund not monetized', text: 'Fund not monetized' }
                ],
                config: {
                  format: 'YYYY-MM-DD',
                  useCurrent: false,
                  showClear: true,
                  showClose: true,
                }
            };
        },
        methods: {
            deleteAct(activity) {
                this.$emit('delete-activity', activity);
            },
            showForm() {
                this.isEditing = true;
            },
            hideForm(activity) {
                this.isEditing = false;
                this.$emit('edit-activity', activity);
            },
        },
        components: {
            datePicker,
        },
    };
</script>

<style scoped>
  .activity-table{
    width:100%;
    table-layout: fixed;
  }
  table, td, th{
    border: 1px solid black;
    border-collapse: collapse;
  }

</style>
