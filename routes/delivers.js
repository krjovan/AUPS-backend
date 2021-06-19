const express = require('express');
const router = express.Router();
let Delivery = require('../models/delivers');


//NIS PAMETNO SAMO CRUD OPERACIJE


router.post('/add', (req, res, next) => {
    let delivery = new Delivery(req.body);
    Delivery.addDeliver(delivery, (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json({});
    });
});

router.patch('/edit', (req, res, next) => {
    let delivery = new Delivery(req.body);
    Delivery.saveDeliver(delivery, (err,data) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(data);
    });
});


router.get('/view/:id', (req, res, next) => {
    Delivery.getDeliverById(req.params.id.toString(), (err, delivery) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!delivery)
            return res.status(422).send("Delivery not found");
        return res.status(200).json(delivery);;
    });
});

router.get('/all', (req, res, next) => {
    Delivery.geAll((err, deliverys) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(deliverys);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Delivery.removeDeliver(req.params.id.toString(), (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(204).send("Delivery removed!");
    });
});

module.exports = router;