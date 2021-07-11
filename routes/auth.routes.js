const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
  '/register',
  [
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }

      const { login, password } = req.body

      const candidate = await User.findOne({ login })

      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ login, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      res
        .status(500)
        .json({ message: `Ошибка при запросе к базу данных: ${e}` })
    }
  }
)

router.post(
  '/login',
  [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        })
      }

      const { login, password } = req.body

      const user = await User.findOne({ login })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' })
      }

      // Вычисляем время от текущего состояния до конца дня и делаем валидным токен до конца дня
      const startHours = new Date().getHours()
      const expiresHours = 24 - startHours

      // Формирование токена (1 - объект, который записывает значения в токен, 2 - секретная строка, 3 - время жизни токена)
      const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), {
        expiresIn: `${expiresHours}h`,
      })

      // Отвечаем по умолчанию со статусом 200
      res.json({
        token,
        id: user._id,
      })
    } catch (e) {
      res
        .status(500)
        .json({ message: `Ошибка при запросе к базу данных: ${e}` })
    }
  }
)

module.exports = router
