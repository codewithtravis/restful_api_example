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

const stuPool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'studata', //swap databases by changing the name
        password: '1Gunther!', // use your own postgres password here
        port:5432
    }
);

const camPool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'camdata', //swap databases by changing the name
        password: '1Gunther!', // use your own postgres password here
        port:5432
    }
);

//------------------------------------------------STUDENT DATA BELOW-------------------------------------------------------
//Routes//

//create a todo (insert data into database)
app.post("/addStudent", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {sname, sgpa, slink} = req.body; //info to be into database
        const newTodo = await stuPool.query(
            /*postgres command to post an element to database*/
            "INSERT INTO studata (sname, sgpa, slink) VALUES($1, $2, $3) RETURNING *", 
            [sname, sgpa, slink]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//get all todos (get everything from database)

app.get("/allStudents", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        /*postgres command to get all elements from database*/
        const allTodos = await stuPool.query("SELECT * FROM studata"); 
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a todo (get one element from database)
app.get("/student/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to get one element from database*/
        const todo = await stuPool.query("SELECT * FROM studata WHERE studata_id = $1", [id]) 
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//update a todo
app.put("/updateStudent/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        const {sname, sgpa, slink} = req.body;
        const updateTodo = await stuPool.query(
            /*postgres command to update one element from database*/
            "UPDATE studata SET (sname, sgpa, slink) = ($1, $2, $3) WHERE studata_id = $4", 
            [sname, sgpa, slink, id]
            );
            res.json("studata was updated!");
    } catch (error) {
        console.log(error.message);
    }
});
//delete a todo

app.delete("/removeStudent/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to delete one element from database*/
        const deleteTodo = await stuPool.query("DELETE FROM studata WHERE studata_id = $1", [id]); 
        res.json("studata was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});
//------------------------------------------------CAMPUS DATA BELOW-------------------------------------------------------

//Routes//

//create a todo (insert data into database)
app.post("/addCampus", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {cname, clocation, clink, cdescription} = req.body; //info to be into database
        const newTodo = await camPool.query(
            /*postgres command to post an element to database*/
            "INSERT INTO camdata (cname, clocation, clink, cdescription) VALUES($1, $2, $3, $4) RETURNING *", 
            [cname, clocation, clink, cdescription]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//get all todos (get everything from database)

app.get("/allCampuses", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        /*postgres command to get all elements from database*/
        const allTodos = await camPool.query("SELECT * FROM camdata"); 
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a todo (get one element from database)
app.get("/campus/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to get one element from database*/
        const todo = await camPool.query("SELECT * FROM camdata WHERE camdata_id = $1", [id]) 
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//update a todo
app.put("/updateCampus/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        const {cname, clocation, clink, cdescription} = req.body;
        const updateTodo = await camPool.query(
            /*postgres command to update one element from database*/
            "UPDATE camdata SET (cname, clocation, clink, cdescription) = ($1, $2, $3, $4) WHERE camdata_id = $5", 
            [cname, clocation, clink, cdescription, id]
            );
            res.json("camdata was updated!");
    } catch (error) {
        console.log(error.message);
    }
});
//delete a todo

app.delete("/removeCampus/:id", async(req, res) => { //change /todos route to "/somethingMoreMeaningful"
    try {
        const {id} = req.params;
        /*postgres command to delete one element from database*/
        const deleteTodo = await camPool.query("DELETE FROM camdata WHERE camdata_id = $1", [id]); 
        res.json("camdata was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});


app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});