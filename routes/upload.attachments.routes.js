const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
const path = require('path')
const config = require('config')
const multer = require('multer')

// Set Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.get('attachmentsPath'))
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

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 200000000 }, // 20МБ
})

const cpUpload = upload.array('attachments', 8)

router.post('/', auth, (req, res) => {
  console.log('Обработка загрузки изображения')

  cpUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Случилась ошибка Multer при загрузке.
      console.log(err)
      res.status(400).json({ message: err })
    } else if (err) {
      // При загрузке произошла неизвестная ошибка.
      console.log(err)
      res.status(400).json({ message: err })
    }
    return res.status(200).json({
      files: req.files.map((file) => ({
        filename: file.originalname,
        path: file.destination + file.filename,
      })),
      message: 'Файлы прикреплены',
    })
  })
})

module.exports = router
