<template>
   <div v-if="Decks" class="deck-comp-cont">
      <DeckFilter />
      <div>
         <div style="display: flex; flex-direction: column; align-items: center;">
            <RouterLink v-for="item in PaginatedItems" :to="'/decks/' + item._id" class="deck-comp-box">
               <div class="deck-comp-icon-box">
                  <img class="set-comp-img" :src="this.handleSetIcon(item.expansion)">
                  <h3 class="deck-comp-title">{{ item.name }}</h3>
               </div>
               <div style="display: flex; flex-direction: row; justify-content: space-between;">
                  <div class="deck-comp-group-box">
                     <h4>Box {{ item.boxNumber }} Group {{ item.group }}</h4>
                  </div>
                  <div class="deck-comp-icon-box">
                     <img class="deck-comp-img" v-for="house in item.houses" :src="this.handleHouseIcon(house)">
                  </div>
               </div>
            </RouterLink>
         </div>
         <Pagination :total-pages="TotalPages" :current-page="currentPage" @page-change="handlePageChange" />
         <p>Deck Count - {{ Decks.length }}</p>
      </div>
      <!-- <StandingComp v-if="Decks" /> -->
   </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';
import { useHouseStore } from '@/stores/HouseStore';
import Pagination from '../Pagination.vue';
import StandingComp from './StandingComp.vue';
import DeckFilter from './DeckFilter.vue';
import { useSetStore } from '@/stores/SetStore';

export default {
   data() {
      return {
         currentPage: 1,
         perPage: 10
      }
   },
   components: {
      Pagination,
      StandingComp,
      DeckFilter
   },
   computed: {
      Decks() {
         if (useDeckStore().allDecks != null) {
            return useDeckStore().allSelectedSets();
         }
         // return useDeckStore().allDecks;
      },
      Houses() {
         return useHouseStore().allHouses
      },
      Sets() {
         if (useSetStore().allSets != null) {
            return useSetStore().allSets;
         }
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
      handleSetIcon(setId) {
         console.log(this.Sets);
         if (this.Sets != null) {
            const currSet = this.Sets.find((item) => item._id == setId);
            return currSet.image;
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
   flex-direction: row;
   padding: 0px 10px;
}

.deck-comp-box {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 900px;
   max-height: 40px;
   margin: 5px 0px;
   align-items: center;
   border: 1px solid black;
   color: #FFFFFF;
   padding: 0px;
   background: hsla(213, 77%, 14%, 1);
   background: linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   background: -moz-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   background: -webkit-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#08203E", endColorstr="#557C93", GradientType=1);
}

.deck-comp-icon-box {
   display: flex;
   flex-direction: row;
   align-items: center;
   max-height: 60px;
   /* width: 150px;
   height: 100%; */
}

.deck-comp-group-box {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   padding-right: 10px;
}

.deck-comp-img {
   width: 40px;
   height: 40px;
}

.set-comp-img {
   width: 40px;
   height: 40px;
}

.deck-comp-title {
   padding-left: 10px;
}
</style>