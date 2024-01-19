const express = require('express');
const cors = require('cors');
const pool = require('./database');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json()); 
app.use(cors());

app.post("/createAccount", async (req, res) => {
    try {

        const username = req.body["account_name"];
        const password = req.body["account_password"];

        const insertSTMT = `INSERT INTO Accounts (account_name, account_password) 
            VALUES ('${username}', '${password}') RETURNING *;`;

        const todo = await pool.query(insertSTMT);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.massage);
    }
});

app.get("/getAllAccounts", async (req, res) => {
    try {
        const {id} = req.params;
        const getSTMT = `SELECT * FROM Accounts`;
        const todo = await pool.query(getSTMT);

        res.json(todo.rows);

    } catch (error) {
        console.error(error.massage);
    }
})

app.put("/updatePasswordInAccoutWithId/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const new_password = req.body["user_password"];
        const deleteSTMT = `UPDATE Accounts SET account_password = '${new_password}' 
                                WHERE id_account = ${id}`;
        const todo = await pool.query(deleteSTMT);
        res.json("Updated!");
    } catch (error) {
        console.error(error.massage);
    }
})

app.delete("/deleteAccoutWithId/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updateSTMT = `DELETE FROM Accounts WHERE ID_account = ${id}`;
        const todo = await pool.query(updateSTMT);
        res.json("Deleted!");
    } catch (error) {
        console.error(error.massage);
    }
})
//===========================================Account.js==========================================
app.get("/search/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const getSTMT = `SELECT * FROM Accounts WHERE ID_account = ${id}`;
        const todo = await pool.query(getSTMT);

        res.json(todo.rows[0]);

    } catch (error) {
        console.error(error.massage);
    }
})
//===========================================Account.js==========================================


app.listen(PORT, () => console.log(`Server on localhost:${PORT}`));
