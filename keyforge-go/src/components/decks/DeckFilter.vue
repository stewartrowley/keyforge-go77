<template>
    <div v-for="set in Sets">
        <label>{{ set.name }}</label>
        <input type="checkbox" v-model="selectedSets">
    </div>
</template>
<script>
import { useSetStore } from '@/stores/SetStore';

export default {
    computed: {
        Sets () {
            return useSetStore().allSets;
        }
    }
}
</script>
<style scoped>
    
</style>