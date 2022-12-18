<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>New Activity</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-item lines="none">
                        <ion-label position="floating">Activity Type</ion-label>
                        <ion-select placeholder="Activity Type" v-model="activity.activity_type">
                            <ion-select-option v-for="activitytype in activitytypes" :key="activitytype.name"
                                :value="activitytype.name">{{ activitytype.name }}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label position="floating">Activity Name</ion-label>
                        <ion-input v-model="activity.activity_name" placeholder="Enter text"></ion-input>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label position="floating">Notes</ion-label>
                        <ion-textarea v-model="activity.notes" placeholder="Notes"></ion-textarea>
                    </ion-item>
                    <ion-button expand="full" @click="save_activity(activity)">Submit</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    alertController, IonTextarea, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    IonPage, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption
} from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardContent,
        IonItem,
        IonInput,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonTextarea,

    },
    setup() {
        const showAlert = async (header: string, subHeader: string, message: string) => {
            const alert = await alertController.create({
                header: header,
                subHeader: subHeader,
                message: message,
                buttons: ['OK'],
                backdropDismiss: false
            });

            await alert.present();
        };
        return { showAlert }

    },
    created() {
        this.get_activity_types();
    },

    data() {
        return {
            activity: {
                activity_name: "",
                activity_type: "",
                notes: "",
            },
            activitytypes: []
        }

    },
    methods: {
        async get_activity_types() {
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/resource/Activity Type?fields=["*"]',
                headers: {
                    'Authorization': 'token 6c82fbe5cb93440:c43e538a40050ec'
                },

            };
            await axios(config)
                .then(response => {
                    this.activitytypes = response.data.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async save_activity(activity: any) {
            console.log('Activity', activity)
            var config = {
                method: 'post',
                url: 'http://localhost:8000/api/resource/Daily Activity',
                headers: {
                    'Authorization': 'token 6c82fbe5cb93440:c43e538a40050ec'
                },
                data: JSON.stringify(activity)
            };
            await axios(config)
                .then(response => {
                    this.activity = {
                        activity_name: "",
                        activity_type: "",
                        notes: "",
                    },
                    this.showAlert("Alert", `Activity - ${response.data.data.name}`, "Woo ! Activity Created")
                })
                .catch(error => {
                    this.showAlert("Alert", "Error Message", String(error))
                })
        }
    },


})
</script>

<style scoped>
ion-content {
    --ion-background-color: #e4e4e4;
}

ion-card {
    --ion-background-color: #fff
}
</style>