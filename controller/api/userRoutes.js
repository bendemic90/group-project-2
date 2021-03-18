const router = require('express').Router();
const User = require('../../models/User');

// CREATE

// READ

// get all users
router.get('/', async (req, res) => {
    // find all users    
    try {
        const user = await User.findAll();
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
    // find all users    
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

// UPDATE

// DELETE