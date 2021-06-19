const express = require('express');
const router = express.Router();
let Type = require('../models/types');


//NIS PAMETNO SAMO CRUD OPERACIJE


router.post('/add', (req, res, next) => {
    let type = new Type(req.body);
    Type.addType(type, (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json({});
    });
});

router.patch('/edit', (req, res, next) => {
    let type = new Type(req.body);
    Type.saveType(type, (err,data) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(201).json(data);
    });
});


router.get('/view/:id', (req, res, next) => {
    Type.getTypeById(req.params.id.toString(), (err, type) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!type)
            return res.status(422).send("Type not found");
        return res.status(200).json(type);;
    });
});

router.get('/all', (req, res, next) => {
    Type.geAll((err, types) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(types);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Type.removeType(req.params.id.toString(), (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(204).send("Type removed!");
    });
});

module.exports = router;