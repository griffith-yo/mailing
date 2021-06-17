const { Router } = require('express')
const Group = require('../models/Group')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ _id: -1 })
    res.json(groups)
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

router.get('/select', auth, async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ _id: -1 })
    res.json(groups.map((group) => ({ label: group.name, value: group._id })))
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router
