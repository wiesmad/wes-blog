const Article = require('../models/article');

module.exports.new_article = (req, res) => {
  res.render('articles/new', { article: new Article() });
};

module.exports.show_article = async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article === null) res.redirect('/');
  res.render('articles/show', { article: article });
};

module.exports.open_for_edit = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article: article });
};

module.exports.save_new = async (req, res, next) => {
  req.article = new Article();
  next();
};

module.exports.save_after_edit = async (req, res, next) => {
  req.article = await Article.findById(req.params.id);
  next();
};

module.exports.delete_article = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
