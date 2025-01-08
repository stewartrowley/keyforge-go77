import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";
import { useDeckStore } from "./DeckStore";
import { useCardStore } from "./CardStore";
import { useHouseStore } from "./HouseStore";
import { useSetStore } from "./SetStore";

export const useHomeStore = defineStore('HomeStore', {
   state () {
      return {
         isReady: false,
         mainDecks: null,
         mainCards: null,
         isDeckSubmitted: false
      }
   },
   actions: {
      async getClientDecks (deckId, boxNumber, group) {
         this.isDeckSubmitted = false;
         await ApiServices.GetClientDecks(deckId)
         .then((response) => {
            const isDeckFound = this.mainDecks.find((item) => item._id === response.data.data.id);
            if(isDeckFound === undefined) {
               var deck = response.data.data;
               deck._id = response.data.data.id;
               deck.boxNumber = boxNumber;
               deck.group = group;
               deck.cards = response.data.data._links.cards;
               deck.houses = response.data.data._links.houses
               ApiServices.PostDeck(deck);
            }
            response.data._linked.cards.forEach((item) => {
               const isCardFound = this.mainCards.find((el) => el._id === item.id)
               if (isCardFound === undefined) {
                  item._id = item.id;
                  ApiServices.PostCard(item);
               }
            })
            this.isDeckSubmitted = true;
         })
     },
      async fetchAll () {
        await ApiServices.GetCards()
        .then((response) => {
          console.log(response.data);
          useCardStore().allCards = response.data;
          this.mainCards = response.data;
            ApiServices.GetDecks()
            .then((result) => {
               console.log(result.data);
               var cards = [];
               result.data.forEach((element) => {
                  element.linked_cards = element.cards.map((item) => {
                     return useCardStore().allCards.find((card) => card._id === item)
                  })
                  element.linked_cards.sort((a,b) => a.card_number - b.card_number);
                  cards.push(...element.linked_cards);

               })
               console.log(result);
               this.mainDecks = result.data.map((item) => {
                  item.boxId = item.boxNumber + item.group;
                  return item;
               })
               console.log(cards);
               cards.forEach((item) => {
                  
                  if (item === undefined) {
                     console.log(item);
                  }
               })
               useDeckStore().allDecks = result.data;
               useDeckStore().deckGroups = Object.groupBy(this.mainDecks, ({ boxId }) => boxId);
               useCardStore().allCardsGroup = Object.groupBy(cards, ({_id}) => _id)
               useCardStore().allOwnedCards = Object.keys(useCardStore().allCardsGroup);
               useDeckStore().groups = Object.keys(useDeckStore().deckGroups);
               console.log(useDeckStore().groups);
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