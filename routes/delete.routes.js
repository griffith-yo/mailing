const { Router } = require('express')
const Group = require('../models/Group')
const Sender = require('../models/Sender')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.delete('/sender/:_id', auth, async (req, res) => {
  try {
    await Sender.deleteOne({ _id: req.params._id })
    res.status(200).json({ message: 'Отправитель удален' })
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

router.delete('/group/:_id', auth, async (req, res) => {
  try {
    await Group.deleteOne({ _id: req.params._id })
    res.status(200).json({ message: 'Группа рассылки удалена' })
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
