const express = require("express")
const path = require("path")
const bodyParser = require("body-parser"); //解析post
const PORT = 55555;

const PATH_STATIC = './static'
const app = express()
const server = require('http').createServer(app)
app.use('/assets', express.static(PATH_STATIC))
//不加这2句 req.body 会为空
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.route("/")
  .get((req, res) => {
    const filepath = path.join(__dirname, '../static/', 'index.html')
    // console.log(filepath)
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filepath)
  })

  server.listen(PORT, () => console.log(`http listening on port ${PORT}!`))

  process.on('exit', function () {
    console.log('Goodbye!')
  })