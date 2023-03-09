const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/', (req, res) => {
  executeQuery('SELECT * FROM users;', (error, results) => {
    if (error) throw error

    const users = Object.values(JSON.parse(JSON.stringify(results)));
    if (users.length < 1) {
      res
        .status(200)
        .json({ success: true, data: "No users in the table" })
    } else {
      res
        .status(200)
        .json({ success: true, data: results })
    }

  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  executeQuery(`
    SELECT * FROM users 
    WHERE id_user LIKE ${id};
    `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({ success: true, data: results })
  })
})

//TODO capire anche qui come gestire gli errori (chiedere anche a juri)
router.post('/', (req, res) => {
  const { name_user, email_user, surname_user, } = req.body
  executeQuery(`
    INSERT INTO users (name_user, email_user, surname_user)
    VALUES ("${name_user}","${email_user}","${surname_user}");
    `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({ success: true, data: "User added correctly" })
  })
})

//TODO trovare modo per modificare solo una voce (es: solo il nome)
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name_user, surname_user, email_user } = req.body

  executeQuery(`
  SELECT id_user FROM users 
  WHERE id_user LIKE ${id};
  `, (error, results) => {
    //transform to string > object > array for remove "query result object" tipe
    if (error) throw error

    const users = Object.values(JSON.parse(JSON.stringify(results)));
    if (users.length < 1) res
      .status(200)
      .json({ success: false, data: `User dosen't exists` })
    else {
      executeQuery(`
    UPDATE users SET 
        name_user = "${name_user}", 
        surname_user = "${surname_user}", 
        email_user = "${email_user}"
    WHERE id_user = ${id};
    `, (error, results) => {
        if (error) throw error
        res
          .status(200)
          .json({
            success: true,
            state: `User updated correctly`
          })
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
