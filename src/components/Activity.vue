<template>
  <div class="tagsandacts">
    <b-container fluid class="text-center">
      <div v-show="!isEditing">
        <div>
          <b-card no-body class="colum-1" border-variant="dark">
            <b-container class="bv-example-row">
              <b-row>
                <b-col><div style="border-color: #242e3b; border-width: 3px;">{{activity.actname}}</div></b-col>
                <b-col><p>{{activity.actdate}}</p></b-col>
                <b-col><p>{{activity.fundrange}}</p></b-col>
                <b-button class="right floated edit icon" size="sm" v-on:click="showForm" pill>
                  <font-awesome-icon icon="edit"/>Edit
                </b-button>
                <b-button class="right floated trash icon" size="sm" variant="danger" v-on:click="deleteAct(activity)" pill>
                  <font-awesome-icon icon="trash-alt"/>
                </b-button>
              </b-row>
              <b-row>
                {{activity.description}}
              </b-row>
            </b-container>
          </b-card>
        </div>
      </div>
    </b-container>
    <div class="content" v-show="isEditing">
      <b-input-group class="mts-3">
        <b-form-input v-model="activity.actname" placeholder="Activity title" type="text"></b-form-input>
        <b-form-input v-model="activity.actdate" placeholder="mm/yyyy" type="text"></b-form-input>
        <b-form-input v-model="activity.fundrange" placeholder="$5k - $10k" type="text"></b-form-input>
        <template>
          <b-form-textarea v-model="activity.description" type="text"></b-form-textarea>
        </template>
        <b-input-group-append>
          <b-button variant="secondary" v-on:click="hideForm">Save</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['activity'],
        data() {
            return {
                isEditing: false,
            };
        },
        methods: {
            deleteAct(activity) {
                this.$emit('delete-activity', activity);
            },
            showForm() {
                this.isEditing = true;
            },
            hideForm() {
                this.isEditing = false;
            },
        },
    };
</script>

<style scoped>

</style>
