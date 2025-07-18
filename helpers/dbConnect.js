const mongoose = require('mongoose')

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    let DB_URL

    if (process.env.MONGODB_URI) {
      DB_URL = process.env.MONGODB_URI
    } else {
      DB_URL = process.env.DB_URL.replace(
        '<username>',
        process.env.DB_USERNAME,
      ).replace('<password>', process.env.DB_PASSWORD)
    }
    cached.promise = mongoose.connect(DB_URL, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

module.exports = dbConnect
