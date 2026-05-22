const express = require('express')
const app = express()
const db = require('./models')
const routerCanchas = require('./routes/canchas.routes')
const routerReservas = require('./routes/reservas.routes')
const routerAutenticacion = require('./routes/auth.routes')
const PORT = 3000

app.use(express.json())

app.use('/', routerCanchas)
app.use('/', routerReservas)
app.use('/', routerAutenticacion)

app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})