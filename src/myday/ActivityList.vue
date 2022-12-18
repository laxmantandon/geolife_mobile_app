<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Acitivity List</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list lines="full">
                <ion-item v-for="activity in activities" :key="activity.name" @click="edit_activity(activity.name)">
                    <ion-label>
                        <h2><b>{{ activity.activity_name}}</b></h2>
                        <p>{{activity.notes}}</p>
                        <h4 color="secondary">{{ activity.name }} {{ "(" + activity.activity_type + ")" }}</h4>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button router-link="/myday/activity">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>

    </ion-page>
</template>

<script lang="ts">
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonFab, IonFabButton, IonIcon,
    IonLabel
} from '@ionic/vue';
import { defineComponent } from 'vue';
import  axios  from 'axios';
import { add } from 'ionicons/icons';

export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonList,
        IonFab,
        IonFabButton,
        IonIcon,
        IonLabel,
    },
    setup() {
        return { add }
    },
    created() {
        this.get_activities()
    },

    data() {
        return {
            activities: [],
        }
    },
    methods: {
        async get_activities() {
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/resource/Daily Activity?fields=["*"]',
                headers: {
                    'Authorization': 'token 6c82fbe5cb93440:c43e538a40050ec'
                }
            };
            await axios(config)
            .then(response => {
                this.activities = response.data.data;
            })
            .catch(error => {
                console.log(error);
            })

        },
        edit_activity(activity: string) {
            this.$router.push({
                path: `/myday/activity/${activity}`,
                params: { id: activity }
            })
        }

    }
})
</script>

<style scoped>
/* ion-content {
    --ion-background-color: #e4e4e4;
}
ion-item {
    --ion-background-color: #fff
} */
</style>