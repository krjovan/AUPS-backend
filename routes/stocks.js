const express = require('express');
const router = express.Router();
let Stock = require('../models/stocks');


//NIS PAMETNO SAMO CRUD OPERACIJE


router.post('/add', (req, res, next) => {
    let stock = new Stock(req.body);
    Stock.addStock(stock, (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json({});
    });
});

router.patch('/edit', (req, res, next) => {
    let stock = new Stock(req.body);
    Stock.saveStock(stock, (err,data) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(201).json(data);
    });
});


router.get('/view/:id', (req, res, next) => {
    Stock.getStockById(req.params.id.toString(), (err, stock) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!stock)
            return res.status(422).send("Stock not found");
        return res.status(200).json(stock);;
    });
});

router.get('/all', (req, res, next) => {
    Stock.geAll((err, stocks) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(stocks);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Stock.removeStock(req.params.id.toString(), (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(204).send("Stock removed!");
    });
});

module.exports = router;