<template>
    <div>
        <div>
            <h3>SET</h3>
            <div v-for="set in Sets">
                <label>{{ set.name }}</label>
                <input type="checkbox" v-model="set.checked">
            </div>
        </div>
        <div>
            <h3>Houses</h3>
            <div style="display: grid;grid-template-columns: 30px 30px">
                <img style="width: 100%;" v-for="house in Houses" :src="house.image">

            </div>
        </div>
        <button @click="submit">Submit</button>
    </div>
</template>
<script>
import { useSetStore } from '@/stores/SetStore';
import { useDeckStore } from '@/stores/DeckStore';
import { useHouseStore } from '@/stores/HouseStore';

export default {
    computed: {
        Sets () {
            return useSetStore().allSets;
        },
        Houses () {
            return useHouseStore().allHouses;
        }
    },
    methods: {
        submit() {
          useDeckStore().selectedSets = this.Sets.filter(item => item.checked);
        }
    }
}
</script>
<style scoped>
    
</style>