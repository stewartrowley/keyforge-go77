<template>
   <div>
      <div>
         <div>{{ selectedSet.name }}</div>
         <div v-for="set in Sets" @click="handleSet(set)">
            {{ set.name }}
         </div>
      </div>
      <!-- <table>
         <thead>
            <tr>
               <th v-for="item in cardHeaders" @click="this.handleSort(item)">{{ item }}</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="card in AllCards">
               <td>{{ card.card_title }}</td>
               <td>{{ card.house }}</td>
               <td>{{ card.card_type }}</td>
               <td>{{ card.rarity }}</td>
               <td>{{ this.cardQuantity(card._id) }}</td>
            </tr>
         </tbody>
      </table> -->
      <CardFilter />
      <Gallery />
   </div>
</template>
<script>
import Gallery from '@/components/cards/Gallery.vue';
import { useCardStore } from '@/stores/CardStore';
import { useSetStore } from '@/stores/SetStore';

export default {
   components: {
      Gallery
   },
   data () {
      return {
         cardHeaders: [
            'Card Title',
            'House',
            'Card Type',
            'Rarity',
            'Quantity'
         ]
      }
   },
   computed: {
      AllCards () {
         return useCardStore().allCards;
      },
      CardCount () {
         return useCardStore().allCardsGroup;
      },
      Sets () {
         return useSetStore().allSets;
      },
      selectedSet: {
         get() {
            console.log(useCardStore().selectedSet);
            return useCardStore().selectedSet;
         },
         set (value) {
            useCardStore().selectedSet = value;
         }
      }
   },
   methods: {
      cardQuantity (cardId) {
         if (useCardStore().allCardsGroup[cardId]) {
            return useCardStore().allCardsGroup[cardId].length;
         } else {
            return 0;
         }
      },
      handleSort (type) {
         if (type === 'Rarity') {
            this.AllCards.sort((a, b) => a.rarity - b.rarity)
         }
      },
      handleSet (set) {
         this.selectedSet = set;
      }
   }
}
</script>
<style scoped>
   
</style>