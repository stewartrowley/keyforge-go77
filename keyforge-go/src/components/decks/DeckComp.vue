<template>
   <div v-if="Decks" class="deck-comp-cont">
      <RouterLink v-for="item in PaginatedItems" :to="'/decks/' + item._id" class="deck-comp-box">
         <h3 class="deck-comp-title">{{ item.name }}</h3>
         <div class="deck-comp-icon-box">
            <img class="deck-comp-img" v-for="house in item.houses" :src="this.handleHouseIcon(house)">
         </div>
      </RouterLink>
    <Pagination 
      :total-pages="TotalPages" 
      :current-page="currentPage" 
      @page-change="handlePageChange" 
    />
  </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';
import { useHouseStore } from '@/stores/HouseStore';
import Pagination from '../Pagination.vue';

export default {
   data () {
      return {
         currentPage: 1,
         perPage: 10
      }
   },
   components: {
      Pagination
   },
   computed: {
      Decks() {
         console.log(useDeckStore().allDecks);
         return useDeckStore().allDecks;
      },
      Houses() {
         return useHouseStore().allHouses
      },
      TotalPages() {
      return Math.ceil(this.Decks.length / this.perPage);
      },
      PaginatedItems() {
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.Decks.slice(startIndex, endIndex);
      }
   },
   methods: {
      handleHouseIcon(house) {
         if (this.Houses != null) {
            const currHouse = this.Houses.find((item) => item._id === house);
            return currHouse.image;
         }
      },
      handlePageChange(page) {
         this.currentPage = page;
      }
   }
}
</script>
<style scoped>
.deck-comp-cont {
   display: flex;
   flex-direction: column;
   padding: 0px 10px;
}
.deck-comp-box {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   max-height: 60px;
   margin: 10px 0px;
   align-items: center;
   border: 1px solid black;
   color: #FFFFFF;
   background: hsla(213, 77%, 14%, 1);
   background: linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   background: -moz-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   background: -webkit-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#08203E", endColorstr="#557C93", GradientType=1 );
}
.deck-comp-icon-box{
   display: flex;
   flex-direction: row;
   align-items: center;
   max-height: 60px;
   /* width: 150px;
   height: 100%; */
}
.deck-comp-img {
   width: 65px;
   height: 65px;
}
.deck-comp-title {
   padding-left: 10px;
}
</style>