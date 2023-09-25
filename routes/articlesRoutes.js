const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'public' });

const { protect } = require('../middleware/authMiddleware');

const {
  new_article,
  show_article,
  open_for_edit,
  save_new,
  save_after_edit,
  delete_article,
} = require('../controllers/articlesController');
const article = require('../models/article');

router.get('/new', protect, new_article);

router.get('/:slug', show_article);

router.get('/edit/:id', protect, open_for_edit);

router.post('/', save_new, protect, saveArticleAndRedirect('new'));

router.put('/:id', save_after_edit, protect, saveArticleAndRedirect('edit'));

router.delete('/:id', protect, delete_article);

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (err) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
