<template>
   <div class="pagination">
     <button :disabled="currentPage === 1" @click="goToPage(1)">First</button>
     <button class="pagination-btn-prev" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Prev</button>
     <button 
       v-for="page in pages" 
       :key="page"
       :class="{ active: currentPage === page, notActive: currentPage != page }"
       @click="goToPage(page)"
     >
       {{ page }}
     </button>
     <button class="pagination-btn-next" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
     <button :disabled="currentPage === totalPages" @click="goToPage(totalPages)">Last</button>
   </div>
 </template>
 
 <script>
 export default {
   props: {
     totalPages: {
       type: Number,
       required: true
     },
     currentPage: {
       type: Number,
       default: 1
     }
   },
   computed: {
     pages() {
       const pages = [];
       for (let i = 1; i <= this.totalPages; i++) {
         pages.push(i);
       }
       return pages;
     }
   },
   methods: {
     goToPage(page) {
       this.$emit('page-change', page);
     }
   }
 };
 </script>
<style scoped>
.pagination {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
}
   .pagination-btn-prev {
      cursor: pointer;
      background-color: black;
      color: white;
      border: none;
   }
   .pagination-btn-next {
      cursor: pointer;
      background-color: black;
      color: white;
      border: none;
   }
   .notActive {
      cursor: pointer;
      background-color: navy;
      color: white;
      border: none;
   }
   .active {
      cursor: pointer;
      background-color: white;
      color: black;
      border: none;
   }
</style>