const { canchaSchema } = require('../schemas/cancha.schema')

const validarCancha = (req, res, next) => {
    const { error } = canchaSchema.validate(req.body)
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validarCancha }