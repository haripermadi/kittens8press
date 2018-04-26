const Article = require('../models/articles')
const jwt = require('jsonwebtoken')

module.exports = {
  getAllArticle: (req, res) => {
    Article.find()
    .sort({updatedAt: 'desc'})
    .populate('author')
    .exec()
    .then(articles => {
      res.status(200).json({
        message: 'success get all articles',
        articles
      })
    }).catch(error => {
      res.status(400).json({
        message: 'failed get all articles',
        error
      })
    })
  },
  createArticle: (req, res) => {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET)
    console.log('decode==', decoded)
    let input= {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      // image: req.body.image,
      image: req.file.cloudStoragePublicUrl,
      author: decoded.id
    }
    Article.create(input, (err, articleInputed) => {
      if(err) {
        res.status(400).json({
          message: 'error',
          err
        })
      }else{
        res.status(201).json({
          message: 'success create article!',
          articleInputed
        })
      }
    })
  },
  removeArticle: (req, res) => {
    let id ={
      _id: req.params.id
    }
    Article.findByIdAndRemove(id, (error, data) => {
      if(!error) {
        res.status(200).json({
          message: 'success remove an article!',
          removed: data
        })
      }else{
        res.status(400).json({
          message: 'error',
          error
        })
      }
    })
  },
  updateArticle: (req, res) => {
    let id ={
      _id: req.params.id
    }
    let updateData = {
      title: req.body.title,
      content: req.body.content
    }
    Article.findOneAndUpdate(id,updateData, (error, data) => {
      if(!error) {
        res.status(200).json({
          message: 'success update an article!'
        })
      }else{
        res.status(400).json({
          message: 'error',
          error
        })
      }
    })
  },
  getArticleByUser: (req, res) => {
    let userId = req.params.id
    Article.find({
      author: userId
    })
    .sort({updatedAt: 'desc'})
    .populate('author')
    .exec()
    .then(userArticles => {
      res.status(200).json({
        message:' success get list user articles',
        userArticles
      })
    }).catch(err=>{
      res.status(400).json({
        message: 'failed get articles'
      })
    })
  },
  getArticleByCategory: (req, res) => {
    Article.find({
      category: req.body.category
    })
    .sort({updatedAt: 'desc'})
    .populate('author')
    .exec()
    .then(articles => {
      res.status(200).json({
        message:' success get list articles',
        articles
      })
    }).catch(err=>{
      res.status(400).json({
        message: 'failed get articles'
      })
    })
  }
}