import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useHouseStore = defineStore('HouseStore', {
   state () {
      return {
         allHouses: null
      }
   },
   actions: {
   }
})