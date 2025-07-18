const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {
  createOrUpdateUser,
  checkGrades,
} = require('../controllers/UserController')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post('/create', createOrUpdateUser)
app.get('/check-grades', checkGrades)

module.exports = app
