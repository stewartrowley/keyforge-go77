import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useCardStore = defineStore('CardStore', {
   state () {
      return {
         allCards: null,
         allCardsGroup: null,
         allOwnedCards: null,
         selectedSet: {"_id":"435","name":"Age of Ascension","houses":["Brobnar","Dis","Logos","Mars","Sanctum","Shadows","Mars"],"image":"https://archonarcana.com/images/thumb/c/c6/Starter-aoa.jpg/250px-Starter-aoa.jpg","code":"AoA"},
      }
   },
   actions: {
      cardCount () {
            return this.allCardsGroup;
      }
   }
})