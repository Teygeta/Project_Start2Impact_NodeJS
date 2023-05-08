const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/:id?', (req, res) => {

  const { id } = req.params

  let query = 'SELECT * FROM users;'
  if (id) query = `SELECT * FROM users WHERE id_user = ${id};`

  executeQuery(query, (error, results) => {
    if (error) throw error
    if (results.length < 1) {
      res
        .status(404)
        .json({ success: false, message: 'User not found' })
    } else {
      res
        .status(200)
        .json({ success: true, data: results })
    }
  })
})


// TODO controllo: prendere tutte le mail nel database e se gia' esiste ritornare errore
router.post('/', (req, res) => {
  const { name_user, email_user, surname_user, } = req.body

  let query = `
    INSERT INTO users (name_user, email_user, surname_user)
    VALUES ("${name_user}","${email_user}","${surname_user}");
    `
  executeQuery(query, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({ success: true, data: "User added correctly" })
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name_user, surname_user, email_user } = req.body

  let query = `
  UPDATE users SET 
    name_user = "${name_user}", 
    surname_user = "${surname_user}", 
    email_user = "${email_user}"
  WHERE id_user = ${id};
  `

  executeQuery(query, (error, results) => {
    if (error) throw error
    if (results.affectedRows === 0) res
      .status(404)
      .json({ success: false, data: `User not found` })
    else {
      res
        .status(200)
        .json({
          success: true,
          state: `User updated correctly`
        })
    }
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  executeQuery(`
    DELETE FROM users
    WHERE id_user = ${id};
    `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({
        success: true,
        state: `User deleted correctly`
      })
  })
})

module.exports = router
