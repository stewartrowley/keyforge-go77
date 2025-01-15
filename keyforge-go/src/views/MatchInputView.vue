<template>
    <div>
        <div>
    <label>Event</label>
    <input type="text" @input="handleEvent">
    <label>Upload Matches</label>
    <input type="file" multiple @change="handleParse" />
    <ul v-if="Files">
      <li v-for="(file, index) in Files" :key="index">{{ file.result }}</li>
    </ul>
    <button @click="handleSubmit">Submit</button>
  </div>
    </div>
</template>
<script>
import { useDeckStore } from '@/stores/DeckStore';

export default {
    data() {
    return {
      files: [],
      event: null
    };
  },
  computed: {
    Files () {
        return this.files;
      }

  },
  methods: {
    handleEvent(event) {
      this.event = event.target.value;
    },
    handleParse (event) {
      this.files = event.target.files;
      useDeckStore().parseFile(this.files, this.event);
    },
    handleSubmit () {
      useDeckStore().postMatches();
    }
  }
}
</script>
<style scoped>
    
</style>