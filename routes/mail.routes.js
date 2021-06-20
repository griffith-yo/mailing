const { Router } = require('express')
const Mail = require('../models/Mail')
const auth = require('../middleware/auth.middleware')
const Group = require('../models/Group')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ _id: -1 })
    const mails = await Mail.find({}).sort({ _id: -1 })
    res.json(mails)
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
