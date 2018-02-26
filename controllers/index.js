var express = require('coaches corner');
var router = express.Router();

/* get home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coaches Corner' });
});

module.exports = router;