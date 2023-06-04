<script setup>
import { watch,ref, onMounted } from "vue";
import SpriteAnim from "./components/SpriteAnim.vue";

const clicks = ref(0);
const storeList = [
  {name: "Hen",cost: 20, multiplier: 2},
  {name: "Mom n Pop",cost: 50, multiplier: 10},
  {name: "Chef",cost: 100, multiplier: 80},
  {name: "Farm",cost: 500, multiplier: 200},
];

var multiplierList = [];

function purchase(cost, multiplier){
  if (clicks.value >= cost){
    clicks.value = clicks.value - cost;
    purchaseMult(multiplier);
    multiplierList.push(multiplier);
    localStorage.multList = JSON.stringify(multiplierList);
  }
}

function purchaseMult(multiplier){
  setInterval(function(){
    clicks.value = clicks.value + multiplier;
    console.log(`${multiplier} called`);
  }, 2000);
}

function clearStorage(){
  localStorage.removeItem('multList');
}

onMounted(() => {
  clicks.value = localStorage.userClicks | 0;
  setInterval(function(){
    localStorage.userClicks = clicks.value;
    //console.log(`${clicks.value} stored`);
  },1000);

  multiplierList = (JSON.parse(localStorage.multList));
  console.log(multiplierList);
  if (multiplierList.length > 0){
    multiplierList.forEach(function(val){
      setInterval(function(){
        clicks.value = clicks.value + val;
        console.log(`${val} called`);
      }, 2000);
    })
  }
})


</script>

<template>
  <div class="wrapper">
    <div class="canvas">
      <h1>🥚Clicker</h1>
      <h1>🥚{{ clicks }}</h1>
      <SpriteAnim @click="clicks++"/>
    </div>
    <div class="store">
      <button @click="clicks = 0">RESET Eggs</button>
      <button @click="clearStorage">RESET Multiplier</button>
      <div v-for="store in storeList">
        <button @click="purchase(store.cost, store.multiplier)">{{ store.name }} -- {{ store.cost}}🥚</button>
      </div>    
    </div>
  </div>
</template>

<style scoped>

.wrapper{
  display: flex;
}
.canvas{
  margin: auto;
  width: 50%;
}

.store{
  display: flex;
  flex-direction: column;
  right: 0%;
}

button{
  width: 100%;
}

h1{
  text-align: center;
}
</style>
