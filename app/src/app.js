const express = require('express')
const app = express()
const port = process.env.PORT

app.use('/*/static', express.static('static'))
app.use('/static', express.static('static'))
app.use('/', express.static('icons'))

app.get('*', function (req, res, next) {
  if (req.path.includes('static')) {
    next()
  } else {
    // eslint-disable-next-line
    res.sendFile(__dirname + '/index.html')
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
