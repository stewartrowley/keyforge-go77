import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useDeckStore = defineStore('DeckStore', {
   state () {
      return {
         allDecks: null
      }
   },
   actions: {
      async fetchAllDecks () {
        await ApiServices.GetDecks()
        .then((response) => {
          console.log(response.data);
          this.allDecks = response.data;
        })
      }
   }
})