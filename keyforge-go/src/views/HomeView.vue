<template>
  <div>
    <router-link to='/enter-matches'>Enter Matches</router-link>
    <div>
      <label>Box Number</label>
      <input type="number" v-model="boxNumber">
      <label>Group</label>
      <select v-model="group">
        <option>A</option>
        <option>B</option>
      </select>
      <label>Enter Url</label>
      <input type="text" v-model="url"/>
      <button type="submit" @click="handleLink">Enter</button>
    </div>
    <div v-if="IsDeckSubmitted">
      <p>Deck Successfully Submitted!</p>
    </div>
  </div>
</template>
<script>
import { useHomeStore } from '@/stores/HomeStore';
export default {
  data () {
    return {
      url: null,
      boxNumber: null,
      group: 'A'
    }
  },
  computed: {
    IsDeckSubmitted () {
      return useHomeStore().isDeckSubmitted;
    }
  },
  methods: {
    handleLink () {
      const parsedUrl = this.url.split('/')
      useHomeStore().getClientDecks(parsedUrl[4], this.boxNumber, this.group);
    }
  }
}
</script>
<style scoped>
  
</style>