const { horarioSchema, actualizarHorarioSchema } = require('../schemas/horario.schema')

const validarHorario = (req, res, next) => {
    const { error } = horarioSchema.validate(req.body)
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validarActualizarHorario = (req, res, next) => {
    const { error } = actualizarHorarioSchema.validate(req.body)
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validarHorario, validarActualizarHorario }
