import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";
import { useDeckStore } from "./DeckStore";
import { useCardStore } from "./CardStore";
import { useHouseStore } from "./HouseStore";
import { useSetStore } from "./SetStore";
import { usePodStore } from "./PodStore";

export const useHomeStore = defineStore('HomeStore', {
   state () {
      return {
         isReady: false,
         mainDecks: null,
         mainCards: null,
         mainHouses: null,
         mainSets: null,
         isDeckSubmitted: false
      }
   },
   actions: {
      async getClientDecks (deckId, boxNumber, group) {
         this.isDeckSubmitted = false;
         await ApiServices.GetClientDecks(deckId)
         .then((response) => {
            console.log(response.data);
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
               console.log(this.mainCards);
               console.log(item.house);
               const isCardFound = this.mainCards.find((el) => el._id == item.id)
               if (isCardFound === undefined) {
                  item._id = item.id;
                  item.house = item.house
                  console.log(item);
                  ApiServices.PostCard(item);
               }
            })
            response.data._linked.houses.forEach((item) => {
               const isHouseFound = this.mainHouses.find((el) => el._id === item.id);
               if (isHouseFound === undefined) {
                  item = Object.assign({}, { _id: item.id }, item);
                  delete item.id;
                  item.color = '',
                  item.banner_image = '/images/Banners/' + item.name + '_Banner.png'
                  ApiServices.PostHouse(item);
               }
            })
            this.isDeckSubmitted = true;
         })
     },
      async fetchAll () {
        await ApiServices.GetCards()
        .then((response) => {
          useCardStore().allCards = response.data;
          this.mainCards = response.data;
            ApiServices.GetDecks()
            .then((result) => {
               var cards = [];
               result.data.forEach((element) => {
                  element.linked_cards = element.cards.map((item) => {
                     return useCardStore().allCards.find((card) => card._id === item)
                  })
                  element.linked_cards.sort((a,b) => a.card_number - b.card_number);
                  cards.push(...element.linked_cards);

               })
               this.mainDecks = result.data.map((item) => {
                  item.boxId = item.boxNumber + item.group;
                  return item;
               })
               useDeckStore().allDecks = result.data;
               useDeckStore().deckGroups = Object.groupBy(this.mainDecks, ({ boxId }) => boxId);
               useCardStore().allCardsGroup = Object.groupBy(cards, ({_id}) => _id)
               useCardStore().allOwnedCards = Object.keys(useCardStore().allCardsGroup);
               useDeckStore().groups = Object.keys(useDeckStore().deckGroups);
               this.mainDecks.forEach((deck) => {
                  deck.houses.forEach ((house) => {
                     var pod = {
                        boxId: deck.boxId,
                        boxNumber: deck.boxNumber,
                        createdAt: deck.createdAt,
                        expansion: deck.expansion,
                        flavor_text: deck.flavor_text,
                        group: deck.group,
                        updatedAt: deck.updatedAt,
                        _id: deck._id,
                        name: deck.name,
   
                     }
                     const podCards = deck.linked_cards.filter((el) => {
                        if (el.house == house) {
                           const podFind = useHouseStore().allHouses.find((item) => item.name == el.house)
                           pod.house_image = podFind.image;
                           pod.house_color = podFind.color;
                           return el
                        }
                     })
                     if (podCards.length === 0) {
                        console.log(deck);
                     }
                     pod.cards = podCards;
                     pod.house = podCards[0].house;
                     usePodStore().allPods.push(pod);
                     
                  })
               });
            })
        })
        await ApiServices.GetHouses()
        .then((response) => {
         this.mainHouses = response.data;
         useHouseStore().allHouses = response.data;
         this.isReady = true;
        })
        await ApiServices.GetSets()
        .then((response) => {
         this.mainSets = response.data;
         this.mainSets.forEach((item) => {
            item.checked = true;
         })
         useSetStore().allSets = response.data;
        })
      }
   }
})