<template>
  <div class="test">
    <h1>Hello: {{aa}}</h1>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        aa: ''
      }
    },
    mounted () {
      this.aa = sessionStorage.name
    }
  }
</script>

<style scoped>
.test {
  color: blue;
}
</style>
