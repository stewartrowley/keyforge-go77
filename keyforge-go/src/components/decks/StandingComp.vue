<template>
    <div>
        <div v-for="set in DeckGroups">
            <div v-for="group in set.groupKeys">
                <h1>Group: {{ group }}</h1>
                <table>
                    <thead>
                        <tr>
                            <th v-for="head in Headers" @click="handleSort(head)">{{ head }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="deck in set.groups[group]">
                            <td>{{ deck.name }}</td>
                            <td>{{ deck.deckStats.record }}</td>
                            <td>{{ deck.deckStats.homeRecord }}</td>
                            <td>{{ deck.deckStats.awayRecord }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';

export default {
    data () {
        return {
            headers: ['Deck Name', 'Record', 'Home', 'Away']
        }
    },
    computed: {
        Headers () {
           return this.headers;
        },
        Groups () {
             return useDeckStore().groups;
        },
        DeckGroups () {
            return useDeckStore().formDeckData();
        }
    },
    methods: {
        handleSort(head) {
            if (head === 'Record') {
                console.log(this.DeckGroups);
                this.DeckGroups.sort((a, b) => b.deckStats.record - a .deckStats.record)
            }
        }
    }
}
</script>
<style scoped>
    
</style>