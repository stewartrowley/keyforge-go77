<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td v-for="item in PodHeaders" @click="handlePodSort(item)">{{ item.title }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pod in Pods">
                    <td>{{ pod.name }}</td>
                    <td>{{ pod.house }}</td>
                    <td>{{ pod.creatureCount }}</td>
                    <td>{{ pod.actionCount }}</td>
                    <td>{{ pod.upgradeCount }}</td>
                    <td>{{ pod.artifactCount }}</td>
                    <td>{{ pod.powerCount}}</td>
                    <td>{{ pod.armorCount }}</td>
                    <td>{{ pod.amberCount }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { usePodStore } from '@/stores/PodStore';

export default {
    data () {
        return {
            podHeaders: [
                {title: 'Deck Name', value: 'name', isSorted: false},
                {title: 'House', value: 'house', isSorted: false},
                {title: 'Creature #', value: 'creatureCount', isSorted: false},
                {title: 'Action #', value: 'actionCount', isSorted: false},
                {title: 'Upgrade #', value: 'upgradeCount', isSorted: false},
                {title: 'Artifact #', value: 'artifactCount', isSorted: false},
                {title: 'Total Power', value: 'powerCount', isSorted: false},
                {title: 'Total Armor', value: 'armorCount', isSorted: false},
                {title: 'Bonus Aember', value: 'amberCount', isSorted: false}
            ],
            pods: null
        }
    },
    computed: {
        Pods () {
            this.pods = this.$props.podData
            return this.pods;
        },
        PodHeaders () {
            return this.podHeaders;
        },
    },
    props: [
        'podData'
    ],
    methods: {
        handlePodSort (type) {
            console.log(type);
            if (type.isSorted) {
                        console.log('it happened')
                        this.pods = this.pods.sort((a, b) => a[type.value] - b[type.value]);
                    } else {
                        this.pods = this.pods.sort((a, b) => b[type.value] - a[type.value]);
                    }
                    console.log(type.isSorted);
                    type.isSorted = type.isSorted === true ? false : true;
        }
    }
}
</script>
<style lang="">
    
</style>