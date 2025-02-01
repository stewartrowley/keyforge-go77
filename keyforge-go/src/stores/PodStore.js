import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const usePodStore = defineStore('PodStore', {
   state () {
      return {
         allPods: [],
         selectedSet: {"_id":"435","name":"Age of Ascension","houses":["Brobnar","Dis","Logos","Mars","Sanctum","Shadows","Mars"],"image":"https://archonarcana.com/images/thumb/c/c6/Starter-aoa.jpg/250px-Starter-aoa.jpg","code":"AoA"},
      }
   },
   actions: {
    podSet (set) {
        const pod = this.allPods.filter((item) => {
         if (item.expansion == set._id) {
            return item;
         }
        });
        console.log(pod);
        return pod;
    }
   }
})