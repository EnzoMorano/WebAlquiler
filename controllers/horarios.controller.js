const { Horario } = require('../models');

const getHorarios = async (req, res) => {
    try {
        const horarios = await Horario.findAll({
            attributes: ['id','dayOfWeek','startTime','endTime','slotDuration','active']
        });
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getHorarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const horario = await Horario.findByPk(id, {
            attributes: ['id','dayOfWeek','startTime','endTime','slotDuration','active']
        });
        if (!horario) return res.status(404).json({ error: 'Horario no encontrado' });
        res.status(200).json(horario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const crearHorario = async (req, res) => {
    try {
        const { dayOfWeek, startTime, endTime, slotDuration, active } = req.body;
        const nuevo = await Horario.create({ dayOfWeek, startTime, endTime, slotDuration, active });
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const actualizarHorario = async (req, res) => {
    const { id } = req.params;
    const { dayOfWeek, startTime, endTime, slotDuration, active } = req.body;
    try {
        const horario = await Horario.findByPk(id);
        if (!horario) return res.status(404).json({ error: 'Horario no encontrado' });

        if (dayOfWeek !== undefined) horario.dayOfWeek = dayOfWeek;
        if (startTime !== undefined) horario.startTime = startTime;
        if (endTime !== undefined) horario.endTime = endTime;
        if (slotDuration !== undefined) horario.slotDuration = slotDuration;
        if (active !== undefined) horario.active = active;

        await horario.save();
        res.status(200).json(horario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const eliminarHorario = async (req, res) => {
    const { id } = req.params;
    try {
        const horario = await Horario.findByPk(id);
        if (!horario) return res.status(404).json({ error: 'Horario no encontrado' });
        await horario.destroy();
        res.status(200).json({ message: 'Horario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getHorarios, getHorarioById, crearHorario, actualizarHorario, eliminarHorario }
