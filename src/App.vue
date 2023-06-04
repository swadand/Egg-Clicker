<script setup>
import { watch } from "vue";
import { CLICKS } from "./composables/Clicks";
import SpriteAnim from "./components/SpriteAnim.vue";

const clicks = CLICKS;
watch(clicks, (newval) => {
    if (newval < 1){
      CLICKS.value = Math.floor(Math.random()*10);
    }
})

</script>

<template>
  <div class="canvas">
    <h1>Clicker</h1>
    <h1>{{ clicks }}</h1>
    <SpriteAnim @click="clicks--"/>
  </div>
</template>

<style scoped>
.canvas{
  margin: auto;
  width: 50%;
}

h1{
  text-align: center;
}
</style>
