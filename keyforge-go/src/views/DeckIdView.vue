<template>
   <div v-if="Decks != null">
      <DeckIdComp />
   </div>
</template>
<script>
import DeckIdComp from '@/components/decks/deckId/DeckIdComp.vue';
import { useDeckStore } from '@/stores/DeckStore';

export default {
   components: {
      DeckIdComp
   },
   computed: {
      Decks () {
         return useDeckStore().allDecks; 
      }
   }
}
</script>
<style scoped>
   
</style>