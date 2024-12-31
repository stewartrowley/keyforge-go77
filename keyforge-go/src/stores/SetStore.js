import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useSetStore = defineStore('SetStore', {
   state () {
      return {
         allSets: null
      }
   },
   actions: {

   }
})