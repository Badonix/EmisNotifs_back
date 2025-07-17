const nodemailer = require('nodemailer')
const User = require('../models/User')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})
console.log(process.env.GOOGLE_APP_PASSWORD)

const sendMail = async (email, subjects, success) => {
  try {
    if (!success) {
      await transporter.sendMail({
        from: 'ემისის ნოტიფი',
        to: email,
        subject: 'რაღაც ვერაა კარგად',
        text: 'შენ ემისზე აღარ გვაქვს წვდომა, სავარაუდოდ შენი ტოკენი აღარ მუშაობს და ახლის დაგენერირებაა საჭირო. ამიტომ ახლა წაგშლი დაა თუ კიდევ გინდა ჩვენი გამოყენება თავიდან დარეგისტრირდი ახალი ტოკენით, მადლობა <3',
      })
      await User.findOneAndDelete({ email })
      return
    }
    let text = ''
    subjects.forEach((subj) => {
      text += subj.subject + ' ' + subj.oldScore + '->' + subj.newScore + '\n'
    })
    await transporter.sendMail({
      from: 'ემისის ნოტიფი',
      to: email,
      subject: 'ვიღაცამ ქულა შეგიტანაა',
      text,
    })
    console.log('EMAIL SENT!')
  } catch (e) {
    console.log(e)
    console.log('SOME ERROR')
  }
}
module.exports = { sendMail }
