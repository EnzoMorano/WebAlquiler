const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
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
        const token = jsonwebtoken.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { login }