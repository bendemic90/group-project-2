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

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if(user == null)
            res.status(404).json({message: `User with id ${req.params.id} not found!`});
        else
            res.status(200).json(user);  
        res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

// UPDATE

router.put('/:id', async (req, res) => {
    try {
        const user = await User.update(req.body, { where: { id: req.params.id } });

        if(user == null)
            res.status(404).json({message: `User with id ${req.params.id} not found!`});
        else
            res.status(200).json(user);    
    } catch(err) {
        res.status(500).json(err);
    }
});

// DELETE

router.delete('/:id', async (req, res) => { 
    try {
        const user = await User.destroy({ where: { id: req.params.id }});

        if(user == null)
            res.status(404).json({message: `User with id ${req.params.id} not found!`});
        else
            res.status(200).json(user);  
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;