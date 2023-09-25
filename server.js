const express = require('express');
const app = express();
const Article = require('./models/article');
const articlesRoutes = require('./routes/articlesRoutes');
const authRoutes = require('./routes/authRoutes');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();
require('./config/connectDB');

app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

//routes
app.use('*', checkUser);
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
});
app.get('/logout', (req, res) => res.clearCookie('jwt').redirect('/'));
app.use('/login', authRoutes);
app.use('/articles', articlesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server running'));

// const port = process.env.PORT || 3000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then((result) => app.listen(port, () => console.log('server and db ok')))
//   .catch((err) => console.log(err));
