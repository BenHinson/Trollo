const {nanoid} = require('nanoid');
const cookie = require('cookie');
const cookie_signature = require('cookie-signature');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Project, Board, Column, Task, User } = require("./models.js");

const cookie_auth_key = '7jWl4UOO1Mcv4bPfR3BDqDwCCm4PEPHrwuYQY9mbzJzQFlLFSE'; // Would be in a hidden file and not on github

// ====================

module.exports = {
  createAccount: async({email, password}, req, res) => {
    const existingUser = await User.findAll({where: {email: email}});
    if (existingUser.length) { // ! return error message if user already exists
      return res.status(400).json({'error': 'An account already exists for this email'})
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const cookieKey = nanoid();
    const username = email.split('@')[0].replace(/[^a-zA-Z +]/g, ' ').replace(/  +/g, ' ');

    User.create({email, password, username, password: hashedPassword, cookieKey}).then((e) => {
      console.log('Successful account creation.')
      res.json({ 'message': 'Account Created' });
    }).catch((err) => {res.json({'message': 'failed', 'error': err})})
  },

  login: async({email, password}, req, res) => {
    const accountData = await User.findOne({where: {email: email}});
    if (!accountData) { return res.status(400).json({'error': 'Incorrect email or password'}) }

    bcrypt.compare(password, accountData.dataValues.password, async(err, result) => {
      if (!result) {
        return res.status(400).json({'error': 'Incorrect email or password'})
      } else {
        console.log('Successful account login.');

        await setCookie(res, accountData.dataValues.cookieKey);
        return res.json({
          'message': 'Successful login',
          'account': {
            id: accountData.dataValues.id,
            email: accountData.dataValues.email,
            username: accountData.dataValues.username,
            cookie: accountData.dataValues.cookieKey
          }
        })
      }
    })
  },

  middle: async(req, res, next) => {
    // ! Dev Bypass.
    if (req.headers?.auth === 'trollo') { req.uID = 1; return next(); }

    // ! FOR DEV:
    if (!req.headers.auth) { return res.status(400).json({'error': 'Not logged in'}) }
    let accountID = await User.findOne({where: {cookieKey: getCookie(req.headers.auth)}});
    if (accountID?.length) {
      req.uID = accountID.dataValues.id;
      return next();
    } else {
      return res.status(400).json({'error': 'You are not logged in'})
    }

    // if (!req.cookies) { return res.status(400).json({'error': 'Not logged in'}) }
    // // authenticate the user.
    // console.log(req.cookies);
    // let cookieDecrypt = getCookie(req.cookies.auth)
    // const existingUser = await User.findOne({where: {cookieKey: email}});
  }
}

const setCookie = (response, cookieKey) => {
  return response.cookie('auth', cookie_signature.sign(cookieKey, cookie_auth_key), {httpOnly: true, secure: true});
}
const getCookie = (authCookie) => {
  return cookie_signature.unsign(authCookie, cookie_auth_key);
}