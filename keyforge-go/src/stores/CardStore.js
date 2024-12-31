import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useCardStore = defineStore('CardStore', {
   state () {
      return {
         allCards: null
      }
   },
   actions: {
      async fetchAllCards () {
        await ApiServices.GetCards()
        .then((response) => {
          console.log(response.data);
          this.allCards = response.data;
        })
      }
   }
})