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
      useDeckStore().getMatches('d056e059-e7be-4e8e-9480-f2448c71f7c1');
   }
}
</script>
<style scoped>
   
</style>