<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Kittens8Press</h1>
        <p class="lead">A place for cats lover to share their loves for cats.</p>
      </div>
    </div>
    <div class="container">
      <h4>List Articles</h4>
      <div class="card mb-3" v-for="(article, i) in listArticles" :key="i">
        <img class="card-img-top" :src="article.image" alt="Card image cap">
        <hr>
        <div class="card-body">
          <h5 class="card-title">{{article.title}}</h5>
          <p class="card-text">{{article.content}}</p>
        </div>
        <div class="card-footer text-muted">
          updatedAt: {{article.updatedAt}} | Post by: {{article.author.username}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    NavBar
  },
  computed: {
    ...mapState([
      'listArticles'
    ])
  },
  created: function () {
    this.$store.dispatch('getAllArticles')
  }
}
</script>

<style>
.jumbotron-fluid {
  background-image: url('http://www.laughspark.info/thumbfiles/705x705//3-cute-kitten-playing-635726823719718798-2197.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 450px;
}

</style>
