import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useCardStore = defineStore('CardStore', {
   state () {
      return {
         allCards: null
      }
   },
   actions: {
   }
})