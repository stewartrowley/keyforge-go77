<template>
   <div>
      <div>
         <div>{{ selectedSet.name }}</div>
         <div v-for="set in Sets" @click="handleSet(set)">
            {{ set.name }}
         </div>
      </div>
      <div>
         <div v-for="pod in Pods">
            <h3>{{ pod.name }}</h3>
            <p>{{ pod.house }}</p>
         </div>
      </div>
   </div>
</template>
<script>
import { usePodStore } from '@/stores/PodStore';
import { useSetStore } from '@/stores/SetStore';
export default {
   computed: {
      Pods () {
         console.log(usePodStore().allPods);
         if (usePodStore().allPods.length > 0) {
         return usePodStore().podSet(this.selectedSet)
         }
      },
      Sets () {
         return useSetStore().allSets;
      },
      selectedSet: {
         get() {
            console.log(usePodStore().selectedSet);
            return usePodStore().selectedSet;
         },
         set (value) {
            usePodStore().selectedSet = value;
         }
      }
   },
   methods: {
      handleSet (set) {
         this.selectedSet = set;
      }
   }
}
</script>
<style>
   
</style>