<template>
  <div class='ui basic content center aligned segment'>
    <b-button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <font-awesome-icon icon="plus" />
    </b-button>
    <div class="mx-auto white-card rounded shadow mt-5" v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <b-input-group prepend="Activity" class="mts-3">
            <b-form-input v-model="actname" placeholder="Activity title" type="text"></b-form-input>
            <date-picker name="date" v-model="activity.actdate" :config="config"></date-picker>
            <template>
              <b-form-select v-model="fundrange" :options="options"></b-form-select>
            </template>
          </b-input-group>
          <template>
            <b-form-textarea size="sm" v-model="description" placeholder="Description"></b-form-textarea>
          </template>
          <div class='ui two button attached buttons'>
            <b-button variant="secondary" v-on:click="sendForm()">
              Create
            </b-button>
            <b-button variant="primary" v-on:click="closeForm">
              Cancel
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import datePicker from 'vue-bootstrap-datetimepicker';
    import { ModelSelect } from 'vue-search-select';
    export default {
        components: {
            ModelSelect,
            datePicker,
        },
        data() {
            return {
                actname: '',
                actdate: '',
                fundrange: '',
                description: '',
                isCreating: false,
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
            openForm() {
                this.isCreating = true;
            },
            closeForm() {
                this.isCreating = false;
            },
            sendForm() {
                if (this.actname.length > 0 && this.actdate.length > 0 && this.fundrange.length > 0) {
                    const actname = this.actname;
                    const actdate = this.actdate;
                    const fundrange = this.fundrange;
                    const description = this.description;
                    this.$emit('create-activity', {
                        actname,
                        actdate,
                        fundrange,
                        description,
                    });
                    this.actname = '';
                    this.actdate = '';
                    this.fundrange = '';
                    this.description = '';
                    this.isCreating = false;
                }
            },
        },
    }
</script>

<style scoped>

</style>
