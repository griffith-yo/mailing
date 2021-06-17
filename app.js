const express = require('express')
const config = require('config')
const path = require('path')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/create', require('./routes/create.routes'))
app.use('/api/upload/group', require('./routes/upload.group.routes'))
app.use(
  '/api/upload/attachments',
  require('./routes/upload.attachments.routes')
)
app.use('/api/send', require('./routes/send.routes'))
app.use('/api/group', require('./routes/group.routes'))
app.use('/api/sender', require('./routes/sender.routes'))
app.use('/api/delete', require('./routes/delete.routes'))
// app.use(
//   '/avatar',
//   express.static(path.join(__dirname, 'client', 'public', 'uploads', 'avatar'))
// )

// Задаем папки по умолчанию
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))

  // А на любые другие запросы отправлять на файл index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log('Start'))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
