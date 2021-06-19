const express = require('express');
const router = express.Router();
let Supplier = require('../models/supplier');


//NIS PAMETNO SAMO CRUD OPERACIJE


router.post('/add', (req, res, next) => {
    let supplier = new Supplier(req.body);
    Supplier.addSupplier(supplier, (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json({});
    });
});

router.patch('/edit', (req, res, next) => {
    let supplier = new Supplier(req.body);
    Supplier.saveSupplier(supplier, (err,data) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(201).json(data);
    });
});


router.get('/view/:id', (req, res, next) => {
    Supplier.getSupplierById(req.params.id.toString(), (err, supplier) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!supplier)
            return res.status(422).send("Supplier not found");
        return res.status(200).json(supplier);;
    });
});

router.get('/all', (req, res, next) => {
    Supplier.geAll((err, suppliers) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(200).json(suppliers);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Supplier.removeSupplier(req.params.id.toString(), (err) => {
        if (err)
            return res.status(500).send("Server error!");
        return res.status(204).send("Supplier removed!");
    });
});

module.exports = router;