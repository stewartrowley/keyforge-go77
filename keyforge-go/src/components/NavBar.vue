<template >
   <div class="nav-container">
     <div class="nav-logo-box">
       <!-- <img class="nav-logo" src="../assets/keyforge-cards/keychart-logo.png" /> -->
       <h1 class="nav-logo-text">KeyforgeGo</h1>
     </div>
     <div class="nav-icons">
       <RouterLink :to="'/house/' + item._id" class="nav-icon-row" v-for="item, index in HouseData" :key="index">
         <img class="nav-icon-house" :src="item.image" />
       </RouterLink>
     </div>
     <nav class="nav-box">
       <RouterLink class="nav-link" to="/">Home</RouterLink>
       <RouterLink class="nav-link" to="/decks">Decks</RouterLink>
       <RouterLink class="nav-link" to="/pods">Pods</RouterLink>
       <RouterLink class="nav-link" to="/cards">Cards</RouterLink>
     </nav>
   </div>
</template>
<script>
import { useHouseStore } from '../stores/HouseStore';
export default {
   computed: {
      HouseData () {
         console.log(useHouseStore().allHouses);
         return useHouseStore().allHouses;
      }
   },
   methods: {
   handleBackground(color) {
     return {
       'background-color': color
     }
   },
 }    
}
</script>
<style scoped>

.nav-container {
 display: grid;
 grid-template-columns: 1fr 2fr 1fr;
 align-items: center;
 justify-content: center;
 background-color: black;
 padding: 1rem;
}
.nav-box {
 display: flex;
 flex-direction: row;
 justify-self: flex-end;
 /* justify-content: space-between; */
}
.nav-logo-box {
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-self: flex-start;
 /* justify-content: space-evenly; */
}
.nav-logo-text {
 padding-left: 1rem;
 font-family: 'Dancing Script', cursive;
 font-size: 60px;
 font-weight: 700;
 color: #fed73b;
}
.nav-logo {
 width: 20%;
}
.nav-link {
 color: #FFFFFF;
 padding: 1rem 1rem;
}
.nav-link:hover {
 background-color: #FFFFFF;
 color: navy;
}
.nav-icons {
 display: flex;
 flex-direction: row;
}
.nav-icon-house {
 width: 70%;
}
.nav-icon-row {
 display: flex;
 flex-direction: column;
 align-items: center;
 cursor: pointer;
}

</style>