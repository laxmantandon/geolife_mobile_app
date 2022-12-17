<template>
    <ion-page>
        <ion-header>
        <ion-toolbar color="primary">
            <ion-title>My Day</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-grid>
            <ion-row>
                <ion-col router-link="/myday/activity/list">
                    <b>Activity</b>
                </ion-col>
            </ion-row>
            <ion-row >
                <ion-col router-link="/myday/expense">
                    <b>Expense</b>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <b>Customer</b>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <b>Day Plan</b>
                </ion-col>
            </ion-row>

        </ion-grid>
    </ion-content>
</ion-page>
</template>

<script lang="ts">
// import { MydayHeader } from '@/myday/MydayHeader.vue';
import { IonPage, IonToolbar, IonTitle, IonHeader, IonContent, IonCol, IonGrid, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        // MydayHeader,
        IonPage,
        IonToolbar,
        IonTitle,
        IonHeader,
        IonContent,
        IonCol,
        IonGrid,
        IonRow
    }
})

</script>

<style scoped>
ion-content {
    --ion-background-color: var(--ion-color-light);
}
ion-col {
    background-color: rgba(194, 191, 191, 0.823);
    border-radius: 5px;
    height: 10vh;
    padding-top: 20px;
    padding-left: 10px;

}
ion-row {
    padding-bottom: 10px;
}
</style>