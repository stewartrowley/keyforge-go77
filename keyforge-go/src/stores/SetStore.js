import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useSetStore = defineStore('SetStore', {
   state () {
      return {
         allSets: null
      }
   },
   actions: {
      async fetchAllSets () {
        await ApiServices.GetSets()
        .then((response) => {
          console.log(response.data);
          this.allSets = response.data;
        })
      }
   }
})