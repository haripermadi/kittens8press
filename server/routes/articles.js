var express = require('express');
var router = express.Router();
const multer = require('multer')
const {getAllArticle, createArticle, removeArticle, updateArticle, getArticleByUser, getArticleByCategory} = require('../controllers/articleController')
const {sendImageGCS} = require('../middlewares/uploadImage')
const {authUser} = require('../middlewares/auth')

const uploadImage = multer ({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
})

router.get('/', getAllArticle)
router.post('/', uploadImage.single('image'), sendImageGCS, createArticle)
router.put('/:id', updateArticle)
router.delete('/:id', removeArticle)
router.get('/author/:id', getArticleByUser)
router.post('/category', getArticleByCategory)

module.exports = router;
