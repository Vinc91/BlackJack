/**
 * all api request declaration
 */
var express = require('express');
var url = require('url');
var querystring = require('querystring');
var router = express.Router();
var Tables = require('../controllers/Tables');

var tables = new Tables();

/**
 * get information of the table
 */
router.get('/viewTables', function (req, res, next) {
  var a = {
    response: tables,
  };

  console.log(querystring.parse(url.parse(req.url).query));

  res.json(a);
});

/**
 * create an new game table
 */
router.get('/createTables', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * log a player
 */
router.post('/login', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * logout a player
 */
router.post('/logout', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * a player join the table
 */
router.post('/joinTable', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * a player leave the table
 */
router.post('/leaveTable', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * a player bet an amount of money and keep his cards
 */
router.post('/bet', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * the player want another card
 */
router.post('/hit', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * the player keep his card and don't want more
 */
router.post('/stand', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * The player may increase the initial bet by up to 100% in exchange for committing to stand after receiving exactly
 * one more card. The additional bet is placed in the betting box next to the original bet. Some games do not permit
 * the player to increase the bet by amounts other than 100%. Non-controlling players may double their wager or decline
 * to do so, but they are bound by the controlling player's decision to take only one card.
 */
router.post('/doubleDown', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 * the player leave his cards (only available on the first call/decision)
 */
router.post('/surrender', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/**
 *
 */
router.post('/split', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = router;