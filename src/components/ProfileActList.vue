<template>
  <div>
    <activity v-on:delete-activity="deleteAct"
              v-for="activity in prof_activities"
              :activity.sync="activity"></activity>
  </div>
</template>

<script>
    import sweetalert from 'sweetalert';
    import Activity from './Activity';
    export default {
        name: ['prof-activity-list'],
        props: ['prof-activities'],
        components: {
            Activity,
        },
        methods: {
            deleteAct(activity) {
                const self = this;
                const accept = false;
                sweetalert({
                    title: 'Are you sure?',
                    text: 'This Activity will be permanently deleted!',
                    icon: 'warning',
                    type: 'input',
                    buttons: {
                        'cancel': {
                            text: "Cancel",
                            value: false,
                            visible: true,
                            className: "",
                            closeModal: true,
                        },
                        'confirm': {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "",
                            closeModal: false,
                        }
                    },
                }).then(function (inputValue) {
                    if (inputValue === true) {
                        const actIndex = self.prof_activities.indexOf(activity);
                        self.prof_activities.splice(actIndex, 1);
                        sweetalert('Deleted!', 'Your Activity has been deleted.', 'success');
                        self.$emit('deleting-activity', actIndex);
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
