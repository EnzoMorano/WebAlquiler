const { Reserva, Cancha, Horario } = require('../models');
const { Op } = require('sequelize');

const generarHorarios = (startTime, endTime, slotDuration) => {
    const horarios = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00Z`);
    const endTimeObj = new Date(`1970-01-01T${endTime}:00Z`);

    while (currentTime < endTimeObj) {
        horarios.push(currentTime.toISOString().substr(11, 5));
        currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    return horarios;
};

const getReservasDisponibles = async (req, res) => {

    const fecha = new Date(req.query.fecha);
    const diaSemana = fecha.getDay();

    const horarios = await Horario.findAll({
    where: {
        active: true,
        [Op.or]: [
            { dayOfWeek: diaSemana },
            { dayOfWeek: null }
        ]
    }
    });
    
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
        const arrayHorarios = [];
        for (const horario of horarios) {
            const slots = generarHorarios(horario.startTime, horario.endTime, horario.slotDuration);
            arrayHorarios.push(...slots);
        }
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

const getReservas = async (req, res) => {
    const where = {};
    if (req.query.fecha) {
        where.date = req.query.fecha;
    }
    if (req.query.canchaId) {
        where.fieldId = req.query.canchaId;
    }
    try {
        const reservas = await Reserva.findAll({
            where,
            attributes: ['id', 'date', 'timeSlot', 'clientName', 'clientDni', 'fieldId', 'paymentStatus', 'amountPaid', 'notes'],
            include: {
                model: Cancha,
                attributes: ['name', 'type']
            }
        });
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
        const cancha = await Cancha.findByPk(fieldId);
        if (!cancha) {
            return res.status(404).json({
                error: "Cancha no encontrada"
            })
        }
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

const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { date, timeSlot, fieldId, clientName, clientDni, paymentStatus, amountPaid, notes } = req.body;

    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        const nuevaFecha = date ?? reserva.date;
        const nuevoHorario = timeSlot ?? reserva.timeSlot;
        const nuevaCanchaId = fieldId ?? reserva.fieldId;

        if (fieldId) {
            const cancha = await Cancha.findByPk(fieldId);
            if (!cancha) {
                return res.status(404).json({ error: 'Cancha no encontrada' });
            }
        }

        const existeReserva = await Reserva.findOne({
            where: {
                date: nuevaFecha,
                fieldId: nuevaCanchaId,
                timeSlot: nuevoHorario,
                id: { [Op.ne]: id }
            }
        });

        if (existeReserva) {
            return res.status(409).json({ error: 'Ya existe una reserva en ese horario para esa cancha' });
        }

        reserva.date = nuevaFecha;
        reserva.timeSlot = nuevoHorario;
        reserva.fieldId = nuevaCanchaId;
        if (clientName !== undefined) reserva.clientName = clientName;
        if (clientDni !== undefined) reserva.clientDni = clientDni;
        if (paymentStatus !== undefined) reserva.paymentStatus = paymentStatus;
        if (amountPaid !== undefined) reserva.amountPaid = amountPaid;
        if (notes !== undefined) reserva.notes = notes;

        await reserva.save();
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const eliminarReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        await reserva.destroy();
        res.status(200).json({ message: 'Reserva eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getReservasDisponibles, getReservas, crearReserva, actualizarReserva, eliminarReserva }