<template>
  <div class="home">
    <nav-bar></nav-bar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar'

export default {
  name: 'home',
  components: {
    NavBar
  }
}
</script>
