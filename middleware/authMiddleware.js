const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).render('authorization/unauthorized');
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.status(401).render('authorization/unauthorized');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = decodedToken.id;
        res.locals.user = user;
        console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { protect, checkUser };
