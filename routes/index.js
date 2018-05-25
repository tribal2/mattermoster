const router = require('express').Router();
const debug = require('debug')('mattermoster:/');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: res.__('Welcome to Mattermoster. Now add some plugins to your project!')
  });
});

module.exports = router;
