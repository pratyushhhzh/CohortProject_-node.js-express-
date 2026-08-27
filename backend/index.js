const express = require("express")
const pool = require("./db")

const app = express()


app.get("/" , (req , res) =>{
    res.send("Backedn is working with Nodemon!")
})


//Tempo database route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed",
    })
  }
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000.")
})