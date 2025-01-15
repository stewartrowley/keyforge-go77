<template>
   <div v-if=" Deck">
      <RouterLink :to="'/decks'">Return to Decks</RouterLink>
      <h1>{{ Deck.name }}</h1>
      <div>
         <img v-for="card in Deck.linked_cards" :src="card.front_image" style="width: 16%;">
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
            const deck = useDeckStore().allDecks.find((item) => item._id === items[2])
            return deck;
            }
      }
   }
}
</script>
<style scoped>
   
</style>