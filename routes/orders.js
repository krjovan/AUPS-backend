const express = require('express');
const router = express.Router();
let Order = require('../models/orders');


//NIS PAMETNO SAMO CRUD OPERACIJE


router.post('/add', (req, res, next) => {
    let order = new Order(req.body);
    Order.addOrder(order, (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json({});
    });
});

router.patch('/edit', (req, res, next) => {
    let order = new Order(req.body);
    Order.saveOrder(order, (err,data) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(201).json(data);
    });
});


router.get('/view/:id', (req, res, next) => {
    Order.getOrderById(req.params.id.toString(), (err, order) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!order)
            return res.status(422).send("Order not found");
        return res.status(200).json(order);;
    });
});

router.get('/all', (req, res, next) => {
    Order.geAll((err, orders) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(orders);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Order.removeOrder(req.params.id.toString(), (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(204).send("Order removed!");
    });
});

module.exports = router;