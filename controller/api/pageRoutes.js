const router = require('express').Router();
const { Router } = require('express');
const Page = require('../../models/Page');
const PageData = require('../../models/PageData');

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

// READ

router.get('/', async (req, res) => {
    try {
        const page = await Page.findAll({
            include: {
                model: PageData
            }
        });

        res.status(200).json(page);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// UPDATE


// DELETE

module.exports = router;