<template>
    <div v-for="set in Sets">
        <label>{{ set.name }}</label>
        <input type="checkbox" v-model="set.checked">
    </div>
    <button @click="submit">Submit</button>
</template>
<script>
import { useSetStore } from '@/stores/SetStore';
import { useDeckStore } from '@/stores/DeckStore';

export default {
    computed: {
        Sets () {
            return useSetStore().allSets;
        },
    },
    methods: {
        submit() {
          useDeckStore().selectedSets = this.Sets.filter(item => item.checked);
          console.log('Selected items:', selectedItems);
        }
    }
}
</script>
<style scoped>
    
</style>