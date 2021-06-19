const pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "1Gunther!",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;