const { reservaSchema } = require('../schemas/reserva.schema')

const validarReserva = (req, res, next) => {
    const { error } = reservaSchema.validate(req.body)
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validarReserva }