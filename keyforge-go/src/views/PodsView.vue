<template>
   <div>
      <div>
         <div>{{ selectedSet.name }}</div>
         <div v-for="set in Sets" @click="handleSet(set)">
            {{ set.name }}
         </div>
      </div>
      <PodComp :pods="Pods"/>
   </div>
</template>
<script>
import { usePodStore } from '@/stores/PodStore';
import { useSetStore } from '@/stores/SetStore';
import PodComp from '@/components/pods/PodComp.vue';
export default {
   components: {
      PodComp
   },
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