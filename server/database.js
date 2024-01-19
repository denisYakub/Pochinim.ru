const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "d89218840117",
    host: "localhost",
    port: 5432,
    database: "pch_login_system",
});

module.exports = pool;