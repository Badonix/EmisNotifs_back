const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const {
  createOrUpdateUser,
  checkGrades,
} = require('../controllers/UserController')
dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL.replace(
  '<username>',
  process.env.DB_USERNAME,
).replace('<password>', process.env.DB_PASSWORD)

const app = express()

app.use(cors())
app.use(express.json())
app.post('/create', createOrUpdateUser)
app.get('/check-grades', checkGrades)

console.log(DB_URL)
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to db')
    const PORT = process.env.PORT
    app.listen(PORT, () => console.log('Server ready on port ' + PORT))
  })
  .catch((e) => {
    console.log(e)
  })
module.exports = app
