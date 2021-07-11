const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Group = require('../models/Group')
const Sender = require('../models/Sender')
const { createTransport } = require('nodemailer')
const { sendMail, expressApp } = require('nodemailer-mail-tracking')
const Mail = require('../models/Mail')
const router = Router()

const mailTrackOptions = {
  baseUrl: `${config.get('baseUrl')}/api/send/mail-track`,
  jwtSecret: 'secret',
  getData: (data) => ({ ...data }),
  onBlankImageView: async (data) => {
    try {
      const mail = await Mail.findById(data.mailResultId)
      const newResults = mail.results.map((result) => {
        if (result.to === data.recipient) result.viewed = true
        return result
      })
      await Mail.findByIdAndUpdate(data.mailResultId, { results: newResults })
    } catch (e) {
      console.log(e)
    }
  },
  onLinkClick: async (data) => {
    try {
      const mail = await Mail.findById(data.mailResultId)
      const newResults = mail.results.map((result) => {
        if (result.to === data.recipient) result.clicked.push(data.link)
        return result
      })
      await Mail.findByIdAndUpdate(data.mailResultId, { results: newResults })
    } catch (e) {
      console.log(e)
    }
  },
}

router.use('/mail-track', expressApp(mailTrackOptions))

router.post('/', auth, async (req, res) => {
  try {
    const { group, sender, theme, body, attachments } = req.body

    const groupInfo = await Group.findById(group)
    const senderInfo = await Sender.findById(sender)

    const transporter = createTransport({
      service: senderInfo.service,
      auth: {
        user: senderInfo.email,
        pass: senderInfo.password,
      },
    })

    transporter.verify((error, success) =>
      error
        ? console.log(error)
        : console.log('Server is ready to take our messages')
    )

    const results = []

    const mail = new Mail({
      group,
      sender,
      theme,
      body,
      attachments,
    })
    await mail.save()
    mailTrackOptions.getData = (data) => ({ ...data, mailResultId: mail._id })

    res.status(200).json({ message: `Рассылка отправлена` })

    await Promise.all(
      groupInfo.emails.map(async (email) => {
        const message = {
          from: `${senderInfo.name} <${senderInfo.email}>`,
          to: email,
          subject: theme,
          text: body,
          html: body,
          attachments,
        }

        const currentMail = await sendMail(
          mailTrackOptions,
          transporter,
          message
        )

        const result = currentMail[0]
        const resultInfo = {
          to: email,
          accepted: true,
          viewed: false,
          clicked: [],
        }

        if (result.result.accepted[0] === email) results.push(resultInfo)
        else results.push({ ...resultInfo, accepted: false })
        await Mail.findByIdAndUpdate(mail._id, { results })
        return
      })
    )
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
