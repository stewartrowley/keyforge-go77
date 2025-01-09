<template>
   <div>
      <table>
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
   computed: {
      AllCards () {
         console.log(useCardStore().allCards)
         return useCardStore().allCards;
      },
      CardCount () {
         console.log(useCardStore().allCardsGroup);
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
      }
   }
}
</script>
<style scoped>
   
</style>