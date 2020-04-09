<template>
  <canvas class="three-scene"></canvas>
</template>

<script>
import ThreeSceneComponent from '~/assets/javascript/components/ThreeSceneComponent';

export default {
    props: {
        data: {
            type: String,
            required: false
        }
    },
    mounted() {
        this.threeSceneComponent = new ThreeSceneComponent({ el: this.$el, data: this.data });
        this.threeSceneComponent.start();
    },
    beforeDestroy() {
        this.threeSceneComponent.stop();
    }
}
</script>

<style>
</style>

