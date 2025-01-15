<template>
   <div v-if="Cards">
      <div class="gallery-flex-container">
         <div v-for="item in Cards">
            <img :src="item.front_image">
         </div>
      </div>
   </div>
</template>
<script>
import { useCardStore } from '@/stores/CardStore';

export default {
   computed: {
      Cards () {
         if (useCardStore().allCards != null) {
            let filteredCards = useCardStore().allCards.filter((item) => {
               if (item.is_maverick === false && item.expansion === 435) {
                  return item
               }
            })
            filteredCards = filteredCards.sort((a, b) => a.card_number - b.card_number)
            return filteredCards;
         }
      }
   }
}
</script>
<style scoped>
.gallery-flex-container {
   display: flex;
   flex-wrap: wrap;
}
</style>