<script setup>
import { onMounted, reactive } from 'vue';

let ctx;
let Img;
let canvas;

const scale = 8;
const width = 24;
const height = 23;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

onMounted(() => {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    
    
    Img = new Image();
    Img.src = "./src/assets/sheets/DinoSprites - doux.png";
    Img.onload = async function() {
        await init();
    };
})

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(Img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;

function step() {
    frameCount++;
  if (frameCount < 8) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  //window.requestAnimationFrame(step);
}

function init() {
  /* drawFrame(0, 0, 0, 0);
  drawFrame(1, 0, scaledWidth, 0);
  drawFrame(0, 0, scaledWidth * 2, 0);
  drawFrame(2, 0, scaledWidth * 3, 0); */
  window.requestAnimationFrame(step);
}

</script>

<template>
    <canvas width="200" height="200">
        
    </canvas>
</template>

<style scoped>
canvas{
  padding: 0;
  margin: auto;
  display: block;
}

canvas:active {
  animation-name: clickEffect;
  animation-duration: 800ms;
}

@keyframes clickEffect{
  0%   {scale: 100%;}
  50%   {scale: 140%;}
  100%   {scale: 100%;}
}
</style>