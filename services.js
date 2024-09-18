
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ message: 'Service name and price are required.' });
    }

    const service = new Service({ name, description, price });
    try {
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;