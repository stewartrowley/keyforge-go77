import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";
import { useDeckStore } from "./DeckStore";
import { useCardStore } from "./CardStore";
import { useHouseStore } from "./HouseStore";
import { useSetStore } from "./SetStore";

export const useHomeStore = defineStore('HomeStore', {
   state () {
      return {
         isReady: false
      }
   },
   actions: {
      async fetchAll () {
        await ApiServices.GetCards()
        .then((response) => {
          console.log(response.data);
          useCardStore().allCards = response.data
            ApiServices.GetDecks()
            .then((result) => {
               console.log(result.data);
               result.data.forEach((element) => {
                  element.linked_cards = element.cards.map((item) => {
                     return useCardStore().allCards.find((card) => card._id === item)
                  })
                  element.linked_cards.sort((a,b) => a.card_number - b.card_number);
               })
               console.log(result);
               useDeckStore().allDecks = result.data;
            })
        })
        await ApiServices.GetHouses()
        .then((response) => {
         useHouseStore().allHouses = response.data;
         this.isReady = true;
        })
        await ApiServices.GetSets()
        .then((response) => {
         useSetStore().allSets = response.data;
        })
      }
   }
})