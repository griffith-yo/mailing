const { Router } = require('express')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')
const config = require('config')
const Group = require('../models/Group')
const Sender = require('../models/Sender')
const nodemailer = require('nodemailer')
const fs = require('fs')
const Mail = require('../models/Mail')
const router = Router()

// Обработка POST запроса
router.post('/', auth, async (req, res) => {
  try {
    // То, что приходит в фронтенд (Получаем из body эти значения)
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
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
      } else {
        console.log('Server is ready to take our messages')
      }
    })

    await Promise.all(
      groupInfo.addresses.map(async (address) => {
        const message = {
          from: senderInfo.email,
          to: address,
          subject: theme,
          text: 'Plaintext',
          html: body,
          attachments,
        }

        const info = await transporter.sendMail(message)
        console.log(info)
      })
    )

    const mail = new Mail({
      group,
      sender,
      theme,
      body,
      attachments,
    })
    // Сохраняем в БД
    await mail.save()
    res.status(201).json(lInfo)
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
