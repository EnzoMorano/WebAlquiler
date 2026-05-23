const { Cancha } = require('../models');

const getCanchas = async (req, res) => {
    try {
        const canchas = await Cancha.findAll({
            attributes: ['id', 'name', 'type', 'price']
        });
        res.status(200).json(canchas)
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getCanchaById = async (req, res) => {
    const { id } = req.params;
    try {
        const cancha = await Cancha.findByPk(id, {
            attributes: ['id', 'name', 'type', 'price']
        });
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }
        res.status(200).json(cancha);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const crearCancha = async (req, res) => {
    const { name, type, price } = req.body;
    try {
        const nuevaCancha = await Cancha.create({ name, type, price });
        res.status(201).json(nuevaCancha);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const actualizarCancha = async (req, res) => {
    const id = req.params.id;
    const { name, type, price } = req.body;
    try {
        const cancha = await Cancha.findByPk(id);
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }   
        if (name !== undefined) cancha.name = name;
        if (type !== undefined) cancha.type = type;
        if (price !== undefined) cancha.price = price;
        await cancha.save();
        res.status(200).json(cancha);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const eliminarCancha = async (req, res) => {
    const { id } = req.params;
    try {
        const cancha = await Cancha.findByPk(id);
        if (!cancha) {
            return res.status(404).json({ error: 'Cancha no encontrada' });
        }
        await cancha.destroy();
        res.status(200).json({ message: 'Cancha eliminada' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getCanchas, getCanchaById, crearCancha, actualizarCancha, eliminarCancha}