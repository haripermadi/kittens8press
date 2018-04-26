const jwt = require('jsonwebtoken')

module.exports = {
  authUser: function (req, res, next) {
    console.log("masuk middleware ==== ",req.headers)
    let token = req.headers.token
    if (token) {
      try {
        let decoded = jwt.verify(token, process.env.SECRET)
        next ()
      }
      catch (error) {
        res.status(400).json({
          error
        })
      }
    } else {
      res.status(400).json({
        message:" restricted!!! You need token to access"
      })
    }
  }
}
