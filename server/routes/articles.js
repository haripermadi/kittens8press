var express = require('express');
var router = express.Router();
const {getAllArticle, createArticle, removeArticle, updateArticle, getArticleByUser, getArticleByCategory} = require('../controllers/articleController')

router.get('/', getAllArticle)
router.post('/', createArticle)
router.put('/:id', updateArticle)
router.delete('/:id', removeArticle)
router.get('/author/:id', getArticleByUser)
router.post('/category', getArticleByCategory)

module.exports = router;
