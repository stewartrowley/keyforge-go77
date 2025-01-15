<template>
   <div>
      <table>
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
               <!-- <td>{{ card }}</td> -->
            </tr>
         </tbody>
      </table>
      <Gallery />
   </div>
</template>
<script>
import Gallery from '@/components/cards/Gallery.vue';
import { useCardStore } from '@/stores/CardStore';

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
      }
   }
}
</script>
<style scoped>
   
</style>