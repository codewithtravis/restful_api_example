const express = require('express');
const app = express();
const cors = require('cors');
var {Pool, Client} = require('pg');
let bodyParser = require('body-parser');
const PORT = 5000;

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json()); //req.body


const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'crudapp', //swap databases by changing the name
        password: '1Gunther!', // use your own postgres password here
        port:5432
    }
);

//Routes//

//create a todo (insert data into database)
app.post("/todos", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {firstName, lastName, email, link, gpa, description} = req.body; //info to be into database
        const newTodo = await pool.query(
            /*postgres command to post an element to database*/
            "INSERT INTO crudapp (firstName, lastName, email, link, gpa, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
            [firstName, lastName, email, link, gpa, description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//get all todos (get everything from database)

app.get("/todos", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        /*postgres command to get all elements from database*/
        const allTodos = await pool.query("SELECT * FROM crudapp"); 
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a todo (get one element from database)
app.get("/todos/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to get one element from database*/
        const todo = await pool.query("SELECT * FROM crudapp WHERE crud_id = $1", [id]) 
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//update a todo
app.put("/todos/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        const {firstName, lastName, email, link, gpa, description} = req.body;
        const updateTodo = await pool.query(
            /*postgres command to update one element from database*/
            "UPDATE crudapp SET (firstName, lastName, email, link, gpa, description) = ($1, $2, $3, $4, $5, $6) WHERE crud_id = $7", 
            [firstName, lastName, email, link, gpa, description, id]
            );
            res.json("crudapp was updated!");
    } catch (error) {
        console.log(error.message);
    }
});
//delete a todo

app.delete("/todos/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to delete one element from database*/
        const deleteTodo = await pool.query("DELETE FROM crudapp WHERE crud_id = $1", [id]); 
        res.json("crudapp was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});