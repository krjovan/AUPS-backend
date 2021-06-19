const express = require('express');
const router = express.Router();
let Article = require('../models/articles');


//NIS PAMETNO SAMO CRUD OPERACIJE


router.post('/add', (req, res, next) => {
    let article = new Article(req.body);
    Article.addArticle(article, (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json({});
    });
});

router.patch('/edit', (req, res, next) => {
    let article = new Article(req.body);
    Article.saveArticle(article, (err,data) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(201).json(data);
    });
});


router.get('/view/:id', (req, res, next) => {
    Article.getArticleById(req.params.id.toString(), (err, article) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!article)
            return res.status(422).send("Article not found");
        return res.status(200).json(article);;
    });
});

router.get('/all', (req, res, next) => {
    Article.geAll((err, users) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(users);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Article.removeArticle(req.params.id.toString(), (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(204).send("Article removed!");
    });
});

module.exports = router;