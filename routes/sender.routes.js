const { Router } = require('express')
const Sender = require('../models/Sender')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const senders = await Sender.find({}).sort({ _id: -1 })
    res.json(senders)
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

router.get('/select', auth, async (req, res) => {
  try {
    const senders = await Sender.find({}, '_id name').sort({ _id: -1 })

    res.json(
      senders.map((sender) => ({ label: sender.name, value: sender._id }))
    )
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
