<template>
   <div :style="handleBannerIconBackground" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
   <div class="house-banner-back" :style="handleBannerIconBackground">
      <img :style="handleBannerIconBackground" style="width: 100%; border-top-left-radius: 10px; border-bottom-left-radius: 10px;" :src="'../../../public/images/banner_cards/' + CurrentHouse.name.toLowerCase() + '_card1.png'">
      <img :style="handleBannerIconBackground" style="width: 100%;" :src="'../../../public/images/banner_cards/' + CurrentHouse.name.toLowerCase() + '_card2.png'">
      <img :style="handleBannerIconBackground" style="width: 252px; height: 252px;" :src="'../../../public/images/banner_icons/' + CurrentHouse.name.toLowerCase() + '_icon.png'">
      <img :style="handleBannerIconBackground" style="width: 100%;" :src="'../../../public/images/banner_cards/' + CurrentHouse.name.toLowerCase() + '_card3.png'">
      <img :style="handleBannerIconBackground" style="width: 100%; border-top-right-radius: 10px; border-bottom-right-radius: 10px;" :src="'../../../public/images/banner_cards/' + CurrentHouse.name.toLowerCase() + '_card4.png'">
   </div>
</div>
   <div v-if="Deck">
      <RouterLink v-for="item in PaginatedDeckItems" :to="'/decks/' + item._id" class="deck-comp-box">
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
      <Pagination :total-pages="TotalDeckPages" :current-page="currentDeckPage" @page-change="handleDeckPageChange" />
   </div>
   <div v-if="Pods">
      <RouterLink v-for="item in PaginatedPodItems" :to="'/decks/' + item._id" :style="handlePodColor(item)"
         class="pod-comp-box">
         <div class="pod-comp-icon-box">
            <img class="set-comp-img" :src="this.handleSetIcon(item.expansion)">
            <h3 class="pod-comp-title">{{ item.name }}</h3>
         </div>
         <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div class="pod-comp-group-box">
               <h4>Box {{ item.boxNumber }} Group {{ item.group }}</h4>
            </div>
            <div class="pod-comp-icon-box">
               <img class="pod-comp-img" :src="item.house_image">
            </div>
         </div>
      </RouterLink>
      <Pagination :total-pages="TotalPodPages" :current-page="currentPodPage" @page-change="handlePodPageChange" />

         <div style="display: flex; flex-wrap: wrap;">
            <div v-for="card in Cards">
               <img :src="card.front_image">
            </div>
         </div>
   </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';
import { useSetStore } from '@/stores/SetStore';
import { useHouseStore } from '@/stores/HouseStore';
import Pagination from '../Pagination.vue';
import { usePodStore } from '@/stores/PodStore';
import { useCardStore } from '@/stores/CardStore';

export default {
   components: {
      Pagination
   },
   data() {
      return {
         currentDeckPage: 1,
         perDeckPage: 10,
         currentPodPage: 1,
         perPodPage: 10
      }
   },
   computed: {
      Deck() {
         const items = this.$route.path.split('/');
         if (useDeckStore().allDecks != null) {
            const deck = useDeckStore().allDecks.filter((item) => {
               if (item.houses.includes(items[2])) {
                  return item;
               }
            })
            return deck;
         }
      },
      Pods() {
         const items = this.$route.path.split('/');
         if (usePodStore().allPods.length != 0) {

            const pod = usePodStore().allPods.filter((item) => {
               if (item.house == items[2]) {
                  return item;
               }
            })
            return pod;
         }
         // return useDeckStore().allDecks;
      },
      Cards() {
         const items = this.$route.path.split('/');
         if (useCardStore().allCards.length != 0) {

            const cards = useCardStore().allCards.filter((item) => {
               console.log(item);
               if (item.house == items[2]) {
                  return item;
               }
            })
            return cards;
         }
         console.log(cards);
      },
      CurrentHouse () {
         const items = this.$route.path.split('/');
         const house = this.Houses.find((item) => item.name == items[2])
         return house;
      },
      Houses() {
         return useHouseStore().allHouses
      },
      Sets() {
         if (useSetStore().allSets != null) {
            return useSetStore().allSets;
         }
      },
      TotalDeckPages() {
         return Math.ceil(this.Deck.length / this.perDeckPage);
      },
      PaginatedDeckItems() {
         const startIndex = (this.currentDeckPage - 1) * this.perDeckPage;
         const endIndex = startIndex + this.perDeckPage;
         return this.Deck.slice(startIndex, endIndex);
      },
      TotalPodPages() {
         return Math.ceil(this.Pods.length / this.perPodPage);
      },
      PaginatedPodItems() {
         const startIndex = (this.currentPodPage - 1) * this.perPodPage;
         const endIndex = startIndex + this.perPodPage;
         return this.Pods.slice(startIndex, endIndex);
      },
      handleBannerIconBackground () {
         return {
            'background-color': this.CurrentHouse.color
         }
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
      handleDeckPageChange(page) {
         this.currentDeckPage = page;
      },
      handlePodColor(pod) {
         return {
            'background-color': pod.house_color
         }
      },
      handlePodPageChange(page) {
         this.currentPodPage = page;
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
   width: 900px;
   max-height: 60px;
   margin: 10px 0px;
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
   width: 65px;
   height: 65px;
}

.set-comp-img {
   width: 60px;
   height: 60px;
}

.deck-comp-title {
   padding-left: 10px;
}

.pod-comp-cont {
   display: flex;
   flex-direction: column;
   padding: 0px 10px;
}

.pod-comp-box {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   max-height: 60px;
   margin: 10px 0px;
   align-items: center;
   border: 1px solid black;
   color: #FFFFFF;
   padding: 0px;
   /* background: hsla(213, 77%, 14%, 1);
   background: linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   background: -moz-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   background: -webkit-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);
   filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#08203E", endColorstr="#557C93", GradientType=1 ); */
}

.pod-comp-icon-box {
   display: flex;
   flex-direction: row;
   align-items: center;
   max-height: 60px;
   /* width: 150px;
   height: 100%; */
}

.pod-comp-group-box {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   padding-right: 10px;
}

.pod-comp-img {
   width: 65px;
   height: 65px;
}

.set-comp-img {
   width: 60px;
   height: 60px;
}

.pod-comp-title {
   padding-left: 10px;
}
.house-banner-back {
   display: flex; 
   flex-direction: row; 
   justify-content: center;
   gap: 5px;
   width: 180px;
}
</style>