const express = require("express")
const server = express()
const db = require("./database/db")

// set public folder
server.use(express.static("public"))

// set req.body
server.use(express.urlencoded({ extended: true }))

// template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


// pages
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

// insert values in database
server.post("/savepoint", (req, res) => {
  // insert values
  const query = `
    INSERT INTO places (
      name,
      image,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ]

  function afterInsertData(err) {
    if (err) return console.log(err)
    return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
  const search = req.query.search
  const remove = req.query.delete

  if (search === '') {
    return res.render("search-results.html", { total: 0 })
  }

  if (remove !== '') {
    db.run(`DELETE FROM places WHERE id = ?`, [remove])
  }

  function getData(err, rows) {
    if (err) return console.log(err)
    const total = rows.length
    return res.render("search-results.html", { places: rows, total })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, getData)
})

server.listen(3000)