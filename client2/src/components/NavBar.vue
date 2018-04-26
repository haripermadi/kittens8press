<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Kittens8Press</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#signUpModal">Sign Up</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#loginModal">Log In</a>
          </li>
          </ul>
        </form>
      </div>
    </nav>
        <!-- signup modal -->
    <div class="modal fade" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Sign Up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name" class="col-form-label">Userame:</label>
                <input type="text" class="form-control" v-model="newUser.username" placeholder="name...">
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <p :class="{ 'control': true }">
                  <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" class="form-control" v-model="newUser.email" placeholder="Email">
                  <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                </p>
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">Password:</label>
                <p class="control has-icon has-icon-right">
                  <input name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" class="form-control" v-model="newUser.password"  placeholder="Password">
                  <i v-show="errors.has('password')" class="fa fa-warning"></i>
                  <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
              </p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  <!-- login modal-->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Log In</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" placeholder="email..." v-model="userLgoin.email">
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">Password:</label>
                <input type="password" class="form-control" placeholder="password..." v-model="userLgoin.password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="logIn">Log In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      newUser: {
        username: '',
        email: '',
        password: ''
      },
      userLgoin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUp: function () {
      console.log(this.newUser)
    },
    logIn: function () {
      console.log(this.userLgoin)
    }
  }

}
</script>

<style>

</style>
