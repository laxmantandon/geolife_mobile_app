<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent
    }
})
</script>