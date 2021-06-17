const { Router } = require('express')
const Group = require('../models/Group')
const fs = require('fs')
const auth = require('../middleware/auth.middleware')
const router = Router()
const path = require('path')
const config = require('config')
const multer = require('multer')

// Set Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.get('txtPath'))
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        path.extname(file.originalname).toLowerCase()
    )
  },
})

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /text|txt/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)
  console.log(path.extname(file.originalname).toLowerCase(), file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Можно загружать только текстовые файлы')
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('group')

router.post('/', auth, async (req, res) => {
  try {
    upload(req, res, async (err) => {
      console.log(req.file)
      if (err) {
        console.log('first err', err)
        res.status(400).json({ message: err })
      } else {
        if (req.file === undefined) {
          console.log('Файл не выбран')
          res.status(400).json({ message: 'Файл не выбран' })
        } else {
          const tag = JSON.stringify(req.body.tag)
          const tags = tag.replace(/"/g, '').split(', ')

          // Читаем данные из файла
          const fileContent = fs.readFileSync(
            req.file.destination + req.file.filename,
            'utf8'
          )
          // Фильтруем построчно
          const fileLines = fileContent
            .split('\n')
            .map((line) => (line ? line.trim() : undefined))
            .filter(Boolean)

          const candidate = await Group.findOne({
            name: req.file.originalname.split('.')[0],
          })

          if (candidate)
            return res
              .status(400)
              .json({ message: 'Группа с таким названием уже существует' })

          const group = new Group({
            name: req.file.originalname.split('.')[0],
            emails: [...new Set(fileLines)],
            tags,
            file: req.file,
          })

          await group.save()

          res.status(200).json({
            message: 'Группа рассылки создана',
            file: req.file,
          })
        }
      }
    })
  } catch (e) {
    res.status(400).json({
      message: `Ошибка в обработке файла: ${e}`,
    })
  }
})

module.exports = router
