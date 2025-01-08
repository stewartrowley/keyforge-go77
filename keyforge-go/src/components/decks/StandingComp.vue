<template>
    <div>
        <div v-for="group in Groups">
            <h1>Group: {{ group }}</h1>
            <div v-for="deck in DeckGroups[group]">
                <h3>{{ deck.name }}</h3>
            </div>
            
        </div>
    </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';

export default {
    computed: {
        Groups () {
             return useDeckStore().groups;
        },
        DeckGroups () {
            return useDeckStore().deckGroups;
        }
    }
}
</script>
<style scoped>
    
</style>