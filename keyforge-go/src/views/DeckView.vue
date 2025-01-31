<template>
   <div>
      <DeckComp />
   </div>
</template>
<script>
import DeckComp from '@/components/decks/DeckComp.vue';
import { useDeckStore } from '@/stores/DeckStore';

export default {
   components: {
      DeckComp
   },
   mounted () {
      useDeckStore().getEvent('season1');
   }
}
</script>
<style scoped>
   
</style>