const User = require('../models/User')
const { fetchGrades } = require('../helpers/fetchGrades')
const { sendMail, sendWelcomeEmail } = require('../helpers/sendMail')
const { encrypt, decrypt } = require('../helpers/encryption')

function isAllowedEmail(email) {
  return email.endsWith('@freeuni.edu.ge') || email.endsWith('@agruni.edu.ge')
}

function isValidJwt(token) {
  const parts = token.split('.')
  if (parts.length !== 3) return false

  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
    return typeof payload === 'object' && payload !== null
  } catch (e) {
    return false
  }
}

const checkGrades = async (req, res) => {
  const users = await User.find()

  for (const user of users) {
    let token
    try {
      token = decrypt(user.token)
    } catch (err) {
      console.error(`Decryption failed for ${user.email}:`, err.message)
      await sendMail(user.email, null, false)
      continue
    }
    if (!isValidJwt(token)) {
      await sendMail(user.email, null, false)
      continue
    }
    const currData = [...user.subjects]
    const newData = await fetchGrades(token, user.email)
    if (!Array.isArray(newData)) {
      continue
    }
    const sortBySubject = (arr) =>
      arr.sort((a, b) => a.subject.localeCompare(b.subject))
    const sortedCurr = sortBySubject([...currData])
    const sortedNew = sortBySubject([...newData])

    let difference = []
    for (let i = 0; i < sortedCurr.length; i++) {
      if (sortedCurr[i].score != sortedNew[i].score) {
        difference.push({
          subject: sortedCurr[i].subject,
          oldScore: sortedCurr[i].score,
          newScore: sortedNew[i].score,
        })
      }
    }

    if (difference.length !== 0) {
      user.subjects = sortedNew
      await user.save()
      await sendMail(user.email, difference, true)
    }
  }

  res.status(200).send('Grade check completed.')
}

const createOrUpdateUser = async (req, res) => {
  const { email, token } = req.body

  if (!email || !token) {
    return res.status(400).json({ error: 'Email and token are required.' })
  }

  if (!isAllowedEmail(email)) {
    return res
      .status(400)
      .json({ error: 'Email must be from freeuni.edu.ge or agruni.edu.ge' })
  }

  if (!isValidJwt(token)) {
    return res
      .status(400)
      .json({ error: 'Invalid token format (not a valid JWT)' })
  }

  try {
    let user = await User.findOne({ email })

    let currScores = await fetchGrades(token, email)
    const encryptedToken = encrypt(token)
    if (!user) {
      user = new User({ email, token: encryptedToken, subjects: currScores })
      await sendWelcomeEmail(email)
      await user.save()
    } else {
      user.token = encryptedToken
      user.subjects = currScores
      await user.save()
    }

    res.status(200).json({ message: 'User created or updated successfully.' })
  } catch (err) {
    console.error('Error in createOrUpdateUser:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  createOrUpdateUser,
  checkGrades,
}
