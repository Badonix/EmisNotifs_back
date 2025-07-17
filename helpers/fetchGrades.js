const axios = require('axios')
const { sendMail } = require('./sendMail')

const fetchGrades = async (token, email) => {
  const url = 'https://emis.campus.edu.ge/student/card'
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    let semester = Math.max(...response.data.card.semesters)
    let data = []
    response.data.results.forEach((result) => {
      if (result.semester == semester) {
        data.push({ subject: result.bookName, score: result.score })
      }
    })
    return data
  } catch (error) {
    sendMail(email, null, false)
    console.error(
      'Failed to fetch grades:',
      error.response?.status,
      error.message,
    )
  }
}
module.exports = { fetchGrades }
