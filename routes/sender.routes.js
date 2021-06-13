const { Router } = require('express')
const Sender = require('../models/Sender')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const senders = await Sender.find({}, '_id name').sort({ _id: -1 })

    res.json(
      senders.map((sender) => ({ label: sender.name, value: sender._id }))
    )
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
    const users = await User.find({})
    const programs = await Program.find({})

    res.json({
      _id: group._id,
      name: group.name,
      dateStart:
        getFullYear(group.dateStart) +
        '-' +
        getMonth(group.dateStart) +
        '-' +
        getDay(group.dateStart),
      dateEnd:
        getFullYear(group.dateEnd) +
        '-' +
        getMonth(group.dateEnd) +
        '-' +
        getDay(group.dateEnd),
      optionsTeacher: mapUsers(users),
      optionsUsers: mapUsers(users),
      optionsPrograms: mapPrograms(programs),
      selectedUsers: await mapSelectedUsers(group.users),
      selectedTeachers: await mapSelectedUsers(group.teachers),
      selectedPrograms: await mapSelectedPrograms(group.programs),
    })
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

router.get('/search/:value', auth, async (req, res) => {
  try {
    search = req.params.value

    const obj = {
      $or: [{ name: { $regex: search, $options: 'i' } }],
    }

    const groups = await Group.find(obj).sort({ _id: -1 })

    res.status(200).json(
      await Promise.all(
        await Promise.all(
          groups.map(async (group) => {
            return {
              _id: group._id,
              name: group.name,
              dateStart: group.dateStart.toLocaleDateString(),
              dateEnd: group.dateEnd.toLocaleDateString(),
              selectedUsers: await mapSelectedUsers(group.users),
              selectedTeachers: await mapSelectedUsers(group.teachers),
              selectedPrograms: await mapSelectedProgramsAndEdudir(
                group.programs
              ),
            }
          })
        )
      )
    )
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` })
  }
})

module.exports = router