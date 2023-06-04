import {ref} from "vue";

export const CLICKS = ref(generateClick());

function generateClick(){
    return Math.floor(Math.random()*10);
}