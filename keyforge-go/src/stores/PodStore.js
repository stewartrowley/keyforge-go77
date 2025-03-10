import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";
import { useHouseStore } from "./HouseStore";

export const usePodStore = defineStore('PodStore', {
   state () {
      return {
         allPods: [],
         allPodStats: [],
         selectedSet: {"_id":"435","name":"Age of Ascension","houses":["Brobnar","Dis","Logos","Mars","Sanctum","Shadows","Mars"],"image":"https://archonarcana.com/images/thumb/c/c6/Starter-aoa.jpg/250px-Starter-aoa.jpg","code":"AoA"},
      }
   },
   actions: {
    podSet (set) {
        const pod = this.allPods.filter((item) => {
         if (item.expansion == set._id) {
            return item;
         }
        });
        return pod;
    },
    setPods (data) {
      data.forEach((deck) => {
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
               name: deck.name
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
            const podStats = this.setPodStats(podCards);
            pod = {
               ...pod,
               ...podStats
            }
            pod.cards = podCards;
            pod.house = podCards[0].house;
            this.allPods.push(pod);
            
         })
      });
    },
    setPodStats (cards) {
         var pod = {};
         pod.creatureCount = 0;
         pod.actionCount  = 0;
         pod.upgradeCount = 0;
         pod.artifactCount = 0;
         pod.powerCount = 0;
         pod.armorCount = 0;
         pod.amberCount = 0;
         cards.forEach((el) => {
            switch (el.card_type) {
               case 'Creature':
                  pod.creatureCount = pod.creatureCount + 1;
                  break;
               case 'Action':
                  pod.actionCount = pod.actionCount + 1;
                  break;
               case 'Upgrade':
                  pod.upgradeCount = pod.upgradeCount + 1;
                  break;
               case 'Artifact':
                  pod.artifactCount = pod.artifactCount + 1;
                  break;
            }
            if(el.power == 'X') {
               pod.powerCount = pod.powerCount + 0;
            } else {
               pod.powerCount = pod.powerCount + JSON.parse(el.power);
            }
            pod.armorCount = pod.armorCount + JSON.parse(el.armor);
            pod.amberCount = pod.amberCount + JSON.parse(el.amber);
         });
         return pod;
    }
   }
})