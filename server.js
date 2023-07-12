/*
Logic for Server
*/

import express from 'express'
const app = express()
app.use(express.json())
import excoRouter from './routes/exco.js'
import epfRouter from './routes/epf.js'

app.use('/users', excoRouter)
app.use('/epfs', epfRouter)

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})