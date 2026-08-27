const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host:"localhost",
    database:"Builder'sCohort_Project_1",
    password:"SaanCDVC@10",
    port:5432,
})

module.exports = pool