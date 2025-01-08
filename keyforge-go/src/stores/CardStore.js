import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useCardStore = defineStore('CardStore', {
   state () {
      return {
         allCards: null,
         allCardsGroup: null,
         allOwnedCards: null
      }
   },
   actions: {
      cardCount () {
            return this.allCardsGroup;
      }
   }
})