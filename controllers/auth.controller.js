const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }  
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { login }