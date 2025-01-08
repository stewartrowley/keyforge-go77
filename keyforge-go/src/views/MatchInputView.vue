<template>
    <div>
        <div>
    <input type="file" multiple @change="handleFiles" />
    <ul>
      <li v-for="(file, index) in Files" :key="index">{{ file }}</li>
    </ul>
  </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
      files: []
    };
  },
  computed: {
    Files () {
        console.log(this.files);
        return this.files;
    }
  },
  methods: {
    handleFiles(event) {
        const files = event.target.files; // FileList object

    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        const reader = new FileReader();
        var fileContent;
        reader.onload = (e) => {
          fileContent = e.target.result;
        };
        reader.readAsText(files[i]);
        this.files.push(reader);
      }
    }
    //     console.log(event.target.files);
    //   this.files = event.target.files;
    }
  }
}
</script>
<style scoped>
    
</style>