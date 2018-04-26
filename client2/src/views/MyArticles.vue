<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <div class="card" v-for="(data, i) in userArticles" :key="i">
        <div class="card-body">
          <h5 class="card-title">{{data.title}}</h5>
          <p class="card-text">{{data.content}}</p>
          <button type="button" class="btn btn-warning" @click="getEditData(data)">Edit</button>
          <button type="button" class="btn btn-danger" @click="removeArticle(data._id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  name: 'MyArticles',
  components: {
    NavBar
  },
  data () {
    return {
      editData: {}
    }
  },
  computed: {
    ...mapState([
      'userArticles'
    ]),
    activeUser: function () {
      return this.$store.getters.getActiveUser.userId
    }
  },
  created: function () {
    console.log('active user===', this.activeUser)
    this.$store.dispatch('getUserArticle', this.activeUser)
  },
  methods: {
    removeArticle: function (id) {
      console.log('id for remove==', id)
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.$store.dispatch('removeArticle', id)
        }
      })
    },
    getEditData: function (data) {
      this.editData = data
    }
  }
}
</script>

<style scoped>
.btn {
  margin-left: 10px;
  margin-right: 10px;
}

</style>
