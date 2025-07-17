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
const sendWelcomeEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: 'ემისის ნოტიფი',
      to: email,
      subject: 'გამარჯობა!',
      text: 'მოკლედ როგორ მუშაობს მაგას გეტყვი, ყოველ 5 წუთში ვნახულობ შენ ქულებს მოცემული ტოკენით, ვადარებ წინა შემოწმებისას ნანახ ქულებს და თუ რაიმე ცვლილება იყო მეილს გიგზავნი! მაინც რო იცოდე, შენი ტოკენი უსაფრთხოდაა, დაშიფრულს ვინახავ ბაზაში. შეიძლება ისე მოხდეს რო რაღაც შეიცვალოს ემისზე, ახალი ტოკენი დაგიგენერიროს და ძველი აღარ მუშაობდეს, ამ შემთხვევაში თავიდან დაგჭირდება აქ დარეგისტრირება ახალი ტოკენით. წესით მივხვდებით თუ შენი ტოკენი აღარ მუშაობს და მეილსაც მოგწერთ მაგაზე, მარა მაინც იცოდე რა. ხო და თუ ისე მოხდა რო აღარ გინდა ნოტიფების მოსვლა აქ უნდა მომწერო და ამოგშლი ხელით, სხვა უკეთესი გზა ვერ მოვიფიქრე ისეთი რითაც სხვების ამოშლაც არ შეგეძლება :დ როცა ის ტოკენი მე რაც მაქვს არავალიდური ხდება შენ მონაცემებს მთლიანად ვშლი მეხსიერების დაზოგვისთვის (არაფერი პირადული). სულ ეს იყო, იმედია იმუშავებს ეს მახინჯი და საშინელი კოდი და მოგივა ხოლმე მეილები ახალ ქულებზე, თუ არადა მე ვეცადე მაინც :((\n რამე კითხვა თუ გექნება აქვე შეგიძლია მომწერო emisnotifs@gmail.com',
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports = { sendMail, sendWelcomeEmail }
