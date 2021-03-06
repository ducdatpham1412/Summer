const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'ducdatpham',
    password: 'ducdat123',
    database: 'summer',
    port: '3000'
})

const app = express()
app.use(cor())
app.use(express.json())


app.listen(3002, ()=>{
    console.log('Go to https://localhost:3002/user to see the data')
} )


app.post('/addUser', (req, res)=>{

    const username = req.body.username
    const password = req.body.password
    connection.query(
        'insert into table account values (default, username, password)',
        (error, result)=>{
            if (error) console.log(error)
            else res.send(result)
        }
    )
} )