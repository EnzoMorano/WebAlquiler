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

module.exports = { getCanchas}