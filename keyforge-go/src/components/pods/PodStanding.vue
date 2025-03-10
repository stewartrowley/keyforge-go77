<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <div style="max-width: 1100px;">
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th v-for="item in PodHeaders" @click="handlePodSort(item)" style="cursor: pointer; background-color: #fed73b;">{{ item.title }} <img
                            v-if="item.isSorted === true" style="width: 13px; rotate: 180deg;"
                            src="../../../public/icons/arrow.svg"><img v-if="item.isSorted === false"
                            style="width: 13px;" src="../../../public/icons/arrow.svg"></th>
                </tr>
            </thead>
            <tbody>
                <tr style="text-align: center;" v-for="pod in PaginatedItems">
                    <td :style="podTableColor(pod.house_color)">{{ pod.name }}</td>
                    <td class="pod-normal-td" style="height: 35px;"><img style="height: 100%" :src="pod.house_image"></td>
                    <td class="pod-normal-td">{{ pod.creatureCount }}</td>
                    <td class="pod-normal-td">{{ pod.actionCount }}</td>
                    <td class="pod-normal-td">{{ pod.upgradeCount }}</td>
                    <td class="pod-normal-td">{{ pod.artifactCount }}</td>
                    <td class="pod-normal-td">{{ pod.powerCount }}</td>
                    <td class="pod-normal-td">{{ pod.armorCount }}</td>
                    <td class="pod-normal-td">{{ pod.amberCount }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination :total-pages="TotalPages" :current-page="currentPage" @page-change="handlePageChange" />
    </div>
  </div>
</template>
<script>
import { usePodStore } from '@/stores/PodStore';
import Pagination from '../Pagination.vue';
export default {
    data() {
        return {
            podHeaders: [
                { title: 'Deck Name', value: 'name', isSorted: false },
                { title: 'House', value: 'house', isSorted: false },
                { title: 'Creature #', value: 'creatureCount', isSorted: false },
                { title: 'Action #', value: 'actionCount', isSorted: false },
                { title: 'Upgrade #', value: 'upgradeCount', isSorted: false },
                { title: 'Artifact #', value: 'artifactCount', isSorted: false },
                { title: 'Total Power', value: 'powerCount', isSorted: false },
                { title: 'Total Armor', value: 'armorCount', isSorted: false },
                { title: 'Bonus Aember', value: 'amberCount', isSorted: false }
            ],
            pods: null,
            currentPage: 1,
            perPage: 10
        }
    },
    components: {
        Pagination
    },
    computed: {
        Pods() {
            this.pods = this.$props.podData
            return this.pods;
        },
        PodHeaders() {
            return this.podHeaders;
        },
        TotalPages() {
            return Math.ceil(this.Pods.length / this.perPage);
        },
        PaginatedItems() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.Pods.slice(startIndex, endIndex);
        }
    },
    props: [
        'podData'
    ],
    methods: {
        podTableColor(color) {
            return {
                'color': 'white',
                'background-color': color
            }
        },
        handlePodSort(type) {
            if (type.isSorted) {
                if (type.value === 'name' || type.value === 'house') {
                  this.pods = this.pods.sort((a, b) => a[type.value].localeCompare(b[type.value]));
                }
                this.pods = this.pods.sort((a, b) => a[type.value] - b[type.value]);
            } else {
              if (type.value === 'name' || type.value === 'house') {
                  this.pods = this.pods.sort((a, b) => b[type.value].localeCompare(a[type.value]));
                }
                this.pods = this.pods.sort((a, b) => b[type.value] - a[type.value]);
            }
            type.isSorted = type.isSorted === true ? false : true;
        },
        handlePageChange(page) {
            this.currentPage = page;
        }
    }
}
</script>
<style>
td {
    padding: 0;
}

.pod-normal-td {
    background-color: silver;
}
</style>