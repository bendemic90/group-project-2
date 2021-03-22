const router = require('express').Router();
const { Router } = require('express');
const { Page, PageData, User } = require('../../models');

// CREATE
router.post('/', async (req, res) => {
    const pageInfo = { name: req.body.name, description: req.body.description };

    let pageData = [];
    if(req.body.pageData != null && req.body.pageData.length > 0) {
        req.body.pageData.forEach((body) => {
            pageData.push(
                {
                    page_id: body.page_id,
                    heading: body.heading,
                    data: body.data,
                    is_reply: body.is_reply,
                    reply_user_id: body.reply_user_id
                }
            );
        });

        try {
            const p = await Page.create(pageInfo);
            const pd = await PageData.bulkCreate(pageData);

            res.status(200).json({p, pd});
        }
        catch(err) {
            res.status(500).json(err);
        }
    }

});

// Create data for a page using id
router.post('/:id', async (req, res) => {
    try {
        const pd = await PageData.create({
            page_id: req.params.id,
            heading: req.body.heading,
            data: req.body.data,
            is_reply: req.body.is_reply,
            reply_user_id: null
        });

        res.status(200).json(pd);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// READ

// Get all
router.get('/', async (req, res) => {
    try {
        const page = await Page.findAll({ include: PageData });

        res.status(200).json(page);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get one
router.get('/:id', async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id, {
            include: PageData
        });

        if(page == null) {
            res.status(404).json({ message: "Could not find page with id: " + req.params.id });
            return;
        }

        res.status(200).json(page);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// UPDATE

router.put('/:id', async (req, res) => {
    try {
        const page = await Page.update(req.body, { 
            where: { 
                id: req.params.id 
            }
        });

        if(page == null) {
            res.status(404).json({ message: "Could not find page with id: " + req.params.id });
            return;
        }

        res.status(200).json(page);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id/data/:data_id', async (req, res) => {
    try {
        const page = await PageData.update(req.body, { 
            where: { 
                id: req.params.data_id,
                page_id: req.params.id 
            }
        });

        if(page == null) {
            res.status(404).json({ message: "Could not find page with id: " + req.params.id });
            return;
        }

        res.status(200).json(page);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE
// Delete page
router.delete('/:id', (req, res) => {
    try {
        const page = Page.destroy({
            where: {
                id: req.params.id,
            }
        });

        if(page == null) 
            res.status(404).json({ message: "Page not found with id: " + req.params.id })

        res.status(200).json(page);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete page data
router.delete('/:id/data/:data_id', async (req, res) => {
    try {
        const page = await PageData.destroy({ 
            where: { 
                id: req.params.data_id,
                page_id: req.params.id 
            }
        });

        if(page == null) {
            res.status(404).json({ message: "Could not find page with id: " + req.params.id });
            return;
        }

        res.status(200).json(page);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;