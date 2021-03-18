const router = require('express').Router();
const User = require('../../models/User');

// CREATE

router.post('/', async (req, res) => {
    // find all users    
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

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
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

// UPDATE

router.put('/:id', async (req, res) => {
    try {
        const user = await User.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

// DELETE

router.delete('/:id', async (req, res) => { 
    try {
        const user = await User.destroy({ where: { id: req.params.id }});
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});