import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useHouseStore = defineStore('HouseStore', {
   state () {
      return {
         allHouses: null
      }
   },
   actions: {
      async fetchAllHouses () {
        await ApiServices.GetHouses()
        .then((response) => {
          console.log(response.data);
          this.allHouses = response.data;
        })
      }
   }
})