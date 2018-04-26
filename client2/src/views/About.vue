<template>
  <div class="about">
    <nav-bar></nav-bar>
    <h1>This is an about page</h1>
    <p>Kittes8Press is blogging platform for kittens lover around the world, where users share their love for kittens.</p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'About',
  components: {
    NavBar
  }
}
</script>
