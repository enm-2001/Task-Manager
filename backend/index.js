const express = require('express')
const client = require('./config/connection.js')
var cors = require('cors')
const app = express()

app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log("Server is running at port 5000...");
})

app.get('/', (req, res) => {
    res.send("Server is running....")
})

app.post("/users", (req, res) => {
    const user = req.body;
    let insertQuery = `insert into users ( name, username, email, password, user_type) values('${user.name}', '${user.uname}','${user.email}', '${user.pwd}', '${user.type}')`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send("Insertion was successful")
            // console.log(result.data);
        }
        else {
            console.log(err.message);
        }
    })
})

app.get("/users", (req, res) => {
    client.query("select * from users", (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})

app.get('/users/:id',(req, res) => {
    client.query(`select * from users where user_id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})

app.post('/login', (req, res) => {
    const { uname, password } = req.body;
    client.query(`select * from users where username = '${uname}'`, (err, result) => {
        if(!err){
            if(result.rows[0].password === password){
                const user = result.rows[0]
                res.send(user)
            }
            else{
                res.json({ pcheck: true })
            }
        }
        else{
            res.send(err)
        }
        
    })
    client.end;
})

app.post('/checkUsername', (req, res) => {
    const username = req.body.username;
    client.query('SELECT username FROM users WHERE username = $1', [username], (error, results) => {
      if (error) {
        // Handle error
        res.status(500).send('Server error');
      } else if (results.rows.length > 0) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    });
    client.end;
  });

app.post("/tasks", (req, res) => {
    const task = req.body;
    let insertQuery = `insert into tasks ( title, description, due_date, status, user_id) values('${task.title}', '${task.desc}','${task.due}', '${task.status}', ${task.user_id})`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send("Insertion was successful")
            // console.log(result.data);
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})

app.get('/tasklist',(req, res) => {
    client.query(`select * from tasks`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
  })

  app.get('/task/:id',(req, res) => {
    const id = req.params.id
    client.query(`select * from tasks where task_id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
  })

app.post('/deleteTask', (req, res) => {
    const {task_id} = req.body; 
    client.query(`delete from tasks where task_id = ${task_id}`,(err, result) => {
        if(!err){
            res.send("Deletion was successful")
        }
        else{
            console.log(err);
        }
    })
    client.end;
})

app.post('/deleteUser', (req, res) => {
    const {user_id} = req.body; 
    client.query(`delete from users where user_id = ${user_id}`,(err, result) => {
        if(!err){
            res.send("Deletion was successful")
        }
        else{
            console.log(err);
        }
    })
    client.end;
})

app.put('/tasks/:id', (req, res) => {
    const task_id = req.params.id
    const task = req.body
    client.query(`update tasks set title = '${task.title}', description = '${task.description}', due_date = '${task.due_date}', status = '${task.status}' where task_id = ${task_id}`, (err, result) => {
        if(!err){
            res.send("Update was successful")
        }
        else{
            res.send(err);
        }
    })
    client.end;
})
