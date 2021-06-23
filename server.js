const express = require('express');
const app = express();
const cors = require('cors');
var {Pool, Client} = require('pg');
const PORT = 4000;

//middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //req.body

const petPool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'getpet', //swap databases by changing the name
        password: '1Gunther!', // use your own postgres password here
        port:5432
    }
);
//------------------------------------------------USER DATA BELOW-------------------------------------------------------
//Routes//

//create a todo (insert data into database)
app.post("/addUser", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {email, name, hash, isAdmin} = req.body; //info to be into database
        const newTodo = await petPool.query(
            /*postgres command to post an element to database*/
            "INSERT INTO userlogin (email, name, hash, isAdmin) VALUES($1, $2, $3, $4) RETURNING *", 
            [email, name, hash, isAdmin]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//get all todos (get everything from database)

app.get("/allUsers", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        /*postgres command to get all elements from database*/
        const allTodos = await petPool.query("SELECT * FROM userlogin"); 
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a todo (get one element from database)
app.get("/user/:email", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {email} = req.params;
        /*postgres command to get one element from database*/
        const todo = await petPool.query("SELECT * FROM userlogin WHERE email = $1", [email]) 
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//update a todo
app.put("/updateUser/:email", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {email} = req.params;
        const {name, hash, isAdmin} = req.body;
        const updateTodo = await petPool.query(
            /*postgres command to update one element from database*/
            "UPDATE userlogin SET (name, hash, isAdmin) = ($1, $2, $3) WHERE email = $4", 
            [email, name, hash, isAdmin]
            );
            res.json("userlogin was updated!");
    } catch (error) {
        console.log(error.message);
    }
});
//delete a todo

app.delete("/removeUser/:email", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {email} = req.params;
        /*postgres command to delete one element from database*/
        const deleteTodo = await petPool.query("DELETE FROM userlogin WHERE email = $1", [email]); 
        res.json("userlogin was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});
//------------------------------------------------PET DATA BELOW-------------------------------------------------------

//Routes//

//create a todo (insert data into database)
app.post("/addPet", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {breed, description, image, reservation_id} = req.body; //info to be into database
        const newTodo = await petPool.query(
            /*postgres command to post an element to database*/
            "INSERT INTO petinfo (breed, description, image, reservation_id) VALUES($1, $2, $3, $4) RETURNING *", 
            [breed, description, image, reservation_id]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//get all todos (get everything from database)

app.get("/allPets", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        /*postgres command to get all elements from database*/
        const allTodos = await petPool.query("SELECT * FROM petinfo"); 
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a todo (get one element from database)
app.get("/pet/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to get one element from database*/
        const todo = await petPool.query("SELECT * FROM petinfo WHERE id = $1", [id]) 
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//update a todo
app.put("/updatePet/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        const {breed, description, image, reservation_id} = req.body;
        const updateTodo = await petPool.query(
            /*postgres command to update one element from database*/
            "UPDATE petinfo SET (breed, description, image, reservation_id) = ($1, $2, $3, $4) WHERE id = $5", 
            [breed, description, image, reservation_id, id]
            );
            res.json("petinfo was updated!");
    } catch (error) {
        console.log(error.message);
    }
});
//delete a todo

app.delete("/removePet/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to delete one element from database*/
        const deleteTodo = await petPool.query("DELETE FROM petinfo WHERE id = $1", [id]); 
        res.json("petinfo was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});


app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});