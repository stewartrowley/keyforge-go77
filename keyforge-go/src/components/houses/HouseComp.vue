<template>
   <div>
      <div v-for="item in Deck">
         <h3>{{item.name}}</h3>
      </div>
   </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';
import { useRoute } from 'vue-router';

export default {
   computed: {
      Deck () {
            const routes = useRoute();
            const items = routes.path.split('/');
            if (useDeckStore().allDecks != null) {
            const deck = useDeckStore().allDecks.filter((item) => {
               if (item.houses.includes(items[2])) {
                  return item;
               }
            })
            return deck;
            }
      }
   }
}
</script>
<style scoped>
   
</style>