const { Router } = require('express')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')
const config = require('config')
const Group = require('../models/Group')
const fs = require('fs')
const Sender = require('../models/Sender')
const router = Router()

// Обработка POST запроса
router.post(
  '/sender',
  auth,
  [check('email', 'Некорректный email').isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный email',
        })
      }

      // То, что приходит в фронтенд (Получаем из body эти значения)
      const { name, email, password, smtp, port, type, service } = req.body

      // Поиск человека по login
      const candidate = await Sender.findOne({ name })

      // Если такой пользователь есть, то прекращаем выполнение скрипта RETURN и выводим сообщение
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Отправитель с таким именем уже существует' })
      }

      const sender = new Sender({
        name,
        email,
        password,
        smtp,
        port,
        secure: port === '465' ? true : false,
        service,
      })
      // Сохраняем в БД
      await sender.save()
      res.status(201).json({ message: 'Отправитель создан' })
    } catch (e) {
      res
        .status(500)
        .json({ message: `Ошибка при запросе к базу данных: ${e}` })
    }
  }
)

module.exports = router
