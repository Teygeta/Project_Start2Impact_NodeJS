const express = require('express')
const router = express.Router()
const connection = require('../modules/database');

// GET USERS OR SINGLE USER
router.get('/:id?', (req, res) => {
  const { id } = req.params

  let query = 'SELECT * FROM users;'
  if (id) query = `SELECT * FROM users WHERE id_user = ?;`

  const values = [id];

  connection.query(query, values, (error, results) => {
    if (error) throw error
    if (results.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' })
    }

    res.status(200).json({
      success: true,
      data: results
    })

  })
})

// CREATE USER
router.post('/', (req, res) => {
  const { name_user, email_user, surname_user, } = req.body


  let query = `
    INSERT INTO users (name_user, email_user, surname_user)
    VALUES (?, ?, ?);
  `

  const values = [name_user, email_user, surname_user];
  connection.query(query, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res
          .status(404)
          .json({ success: true, data: `${email_user} already exist` })
      } throw error
    }

    res
      .status(200)
      .json({ success: true, data: "User added correctly" })
  })
})

// EDIT USER
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name_user, surname_user, email_user } = req.body

  let query = `
  UPDATE users SET 
    name_user = ?, 
    surname_user = ?, 
    email_user = ?
  WHERE id_user = ?;
  `

  const values = [name_user, surname_user, email_user, id]

  connection.query(query, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res
          .status(404)
          .json({ success: false, data: `User email already exist` })
      } throw error
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, data: `User ${id} not found` })
    }

    res.status(200).json({
      success: true,
      state: `User ${id} updated correctly`
    })
  })
})

//DELETE USER
router.delete('/:id', (req, res) => {
  const { id } = req.params
  let query = `DELETE FROM users WHERE id_user = ?;`

  const values = [id]

  connection.query(query, values, (error, results) => {
    if (error) throw error;
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: `User not found`
      })
    }

    res.status(200).json({
      success: true,
      state: `User ${2} deleted correctly`
    })
  })
})

module.exports = router
