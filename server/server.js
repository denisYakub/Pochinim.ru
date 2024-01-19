const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./database');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json()); 
app.use(cors());
app.use(cookieParser());

app.post("/createAccount", async (req, res) => {
    try {

        const username = req.body["account_name"];
        const password = req.body["account_password"];

        const insertSTMT = `INSERT INTO Accounts (account_name, account_password) 
            VALUES ('${username}', '${password}') RETURNING *;`;

        const todo = await pool.query(insertSTMT);

        const todo1 = await pool.query(`Select max(id_account) FROM Accounts`);

        res.json(todo1.rows[0]);
    } catch (error) {
        console.error("Error:", error.massage);
    }
});

app.get("/id/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const getSTMT = `Select id_account FROM Accounts WHERE account_name = '${id}'`;
        const todo = await pool.query(getSTMT);

        res.json(todo.rows[0]);

    } catch (error) {
        console.error(error.massage);
    }
})

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

app.post("/saveToken", async (req, res) => {
    try {
        const account_token = req.body["account_token"];
        const account_id = req.body["account_id"];
        const todo1 = await pool.query(`SELECT Count(*) FROM accounts_tokens 
                                        WHERE id_account = ${account_id}`)
        if(todo1.rows[0].count > 0)
        {
            res.json("ERROR: account with this token have been created!");


        }else{
            const STMT = `INSERT INTO accounts_tokens (id_account, token) 
                            VALUES (${account_id}, '${account_token}')`;
            const todo = await pool.query(STMT);
            res.json(todo.rows[0]);
        }
        

    } catch (error) {
        console.error(error.massage);
    }
})

app.put("/updateToken", async (req, res) => {
    try {
        const account_token = req.body["account_token"];
        const account_id = req.body["account_id"];
        
        const STMT = `UPDATE accounts_tokens SET token = '${account_token}' 
                                WHERE id_account = ${account_id}`;
        const todo = await pool.query(STMT);
        res.json("Updated!");
    } catch (error) {
        console.error(error.massage);
    }
})

app.listen(PORT, () => console.log(`Server on localhost:${PORT}`));

