<template>
  <div>
    <nav-bar></nav-bar>
    <div class="jumbotron jumbotron-fluid">
      Post Your Article Here...
    </div>
    <div class="jumbotron" id="addArticle">
      <form>
        <div class="form-group">
          <label for="name" class="col-form-label">Title:</label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <hr>
        <div class="form-group">
          <label for="content" class="col-form-label">Content:</label>
          <textarea  class="form-control" rows="5" v-model="content"></textarea>
        </div>
        <hr>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Category</label>
          <select class="form-control" id="exampleFormControlSelect1" v-model="category">
            <option>activities</option>
            <option>health</option>
            <option>accesories</option>
            <option>tips</option>
          </select>
        </div>
        <hr>
        <div class="form-group">
          <label for="exampleFormControlFile1">Image:</label>
          <input type="file" name="image" class="form-control-file" id="uploadImage"
          accept="image/*" @change="handleUpload">
        </div>
        <button v-if="fieldData === true" type="button" class="btn btn-primary btn-block" @click="postNewArticle">Post</button>
        <p v-else class="text-danger">All fields input must be filled!!</p>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'PostArticle',
  components: {
    NavBar
  },
  data () {
    return {
      title: '',
      content: '',
      category: '',
      image: ''
    }
  },
  computed: {
    fieldData: function () {
      if (this.title !== '' && this.content !== '' && this.category !== '' && this.image !== '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    postNewArticle: function () {
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('content', this.category)
      formData.append('image', this.image)
      this.$store.dispatch('addArticle', formData)
      alert('psot success!')
      this.$router.push({path: '/'})
      location.reload()
    },
    handleUpload: function (event) {
      console.log('handle=====', event.target.files[0])
      this.image = event.target.files[0]
    }
  }
}
</script>

<style scoped>
#addArticle {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
