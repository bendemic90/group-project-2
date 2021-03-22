const router = require('express').Router();
const { User } = require('../models');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// router.use((req, res) => {
//     res.send("<h1>Wrong Route!</h1>")
// });

router.get('/', async (req, res) => {
    try {
        const tempPageStuff = await User.findAll();
        res.render('homepage', tempPageStuff);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
