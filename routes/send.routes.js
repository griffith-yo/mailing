const { Router } = require('express')
// const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')
const Group = require('../models/Group')
const Sender = require('../models/Sender')
const nodemailer = require('nodemailer')
// const fs = require('fs')
const Mail = require('../models/Mail')
const router = Router()

// Обработка POST запроса
router.post('/', auth, async (req, res) => {
  try {
    const { group, sender, theme, body, attachments } = req.body

    const groupInfo = await Group.findById(group)
    const senderInfo = await Sender.findById(sender)

    const transporter = nodemailer.createTransport({
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

    res.status(200).json({ message: `Рассылка отправлена` })

    const results = await Promise.all(
      groupInfo.emails.map(async (email) => {
        const message = {
          from: `${senderInfo.name} <${senderInfo.email}>`,
          to: email,
          subject: theme,
          html: body,
          attachments,
        }
        return await transporter.sendMail(message)
      })
    )
    const mail = new Mail({
      group,
      sender,
      theme,
      body,
      results,
      attachments,
    })
    await mail.save()
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
