import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useDeckStore = defineStore('DeckStore', {
   state () {
      return {
         allDecks: null,
         deckGroups: null,
         groups: null
      }
   },
   actions: {
   }
})