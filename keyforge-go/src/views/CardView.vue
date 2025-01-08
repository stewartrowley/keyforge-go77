<template>
   <div>
      <div>{{ allCardsGroup }}</div>
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
      CardCount () {
         console.log(useCardStore().allCardsGroup);
         return useCardStore().allCardsGroup;
      }
   }
}
</script>
<style scoped>
   
</style>