<template>
    <ion-header>
        <ion-toolbar color="primary">
            <ion-title>My Day</ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import { IonToolbar, IonTitle, IonHeader} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonToolbar,
        IonTitle,
        IonHeader,
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