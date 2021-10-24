<template>
  <pmheader/>
  <teclado/>
</template>

<script>
import Pmheader from '@/components/header.vue'
import teclado from '@/components/teclado.vue'


export default {
  name: 'app',
  components: { 
    Pmheader,
    teclado,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
