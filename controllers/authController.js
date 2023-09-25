const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv');

module.exports.login = async (req, res) => {
  const { name, pass } = await req.body;
  
  if (name !== process.env.ADMIN_NAME || pass !== process.env.ADMIN_PASS)
    return res.status(401).render('authorization/unauthorized');

  try {
    const id = process.env.TOKEN_ID;
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: 3600,
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    return res.status(201).redirect('/');
  } catch (err) {
    res.status(401).render('authorization/unauthorized');
  }
};
