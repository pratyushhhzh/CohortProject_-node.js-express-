const express = require("express")
const pool = require("./db")

const app = express()
app.use(express.json())

app.get("/" , (req , res) =>{
    res.send("Backedn is working with Nodemon!")
})



// POST user endpoint
app.post("/user",async(req,res) => {
    try{
        const { name , registration_no , email , password , age } = req.body
        const result = await pool.query(
            `INSERT INTO users(name, registration_no ,email , password, age)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *`,
            [name,registration_no , email, password,age]
        )

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0],
        })
    }catch(error) {
        console.error(error)

        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

// GET user endpoint
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});


app.listen(5000, ()=>{
    console.log("server is running on port 5000.")
})