const { Reserva } = require('../models');

const arrayHorarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"] // Posterior reemplazo por tabla!

const getReservasDisponibles = async (req, res) => {
    try {
        // Filtrar los horarios reservados para date | fieldId
        const reservasOcup = await Reserva.findAll({
            where: {
                date: req.query.fecha,
                fieldId: req.query.canchaId
            },
            attributes: ['date','timeSlot','fieldId']
        });

        // Filtrar los horarios disponibles
        const reservasDisp = arrayHorarios.filter(hora => !reservasOcup.some(reserva => reserva.timeSlot === hora));
        const reservas = reservasDisp.map(hora => ({
            date: req.query.fecha,
            timeSlot: hora,
            fieldId: req.query.canchaId
        }))
        res.status(200).json(reservas)
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const crearReserva = async (req, res) => {
    try {
        const { date, timeSlot, clientName, clientDni, fieldId, paymentStatus, amountPaid, notes } = req.body
        
        const existeReserva = await Reserva.findOne({
            where: {
                date,
                fieldId,
                timeSlot
            },
        });

        if (!existeReserva) { 
            const reserva = await Reserva.create({
                date,
                timeSlot,
                clientName,
                clientDni,
                fieldId,
                paymentStatus,
                amountPaid,
                notes
            })
            res.status(201).json(reserva)
        }
        else {
            res.status(409).json({
            error: "Error al crear la reserva, horario ocupado"
        })
        }
        
    } catch (error) {
        res.status(500).json({
            error: "Error al crear la reserva"
        })
    }
}

module.exports = { getReservasDisponibles, crearReserva}