const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
const db = require('./models')
const routerCanchas = require('./routes/canchas.routes')
const routerReservas = require('./routes/reservas.routes')
const routerAutenticacion = require('./routes/auth.routes')
const routerAdmin = require('./routes/admin.routes')
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/', routerCanchas)
app.use('/', routerReservas)
app.use('/', routerAutenticacion)
app.use('/', routerAdmin)

app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})