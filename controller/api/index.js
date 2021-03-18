const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pageRoutes = require('./pageRoutes');

router.use('/users', userRoutes);
router.use('/pages', pageRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;