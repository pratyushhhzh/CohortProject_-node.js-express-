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

    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});


// Post Login Endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

//Update (in this we have to enter every field to update , not just any one... its not custom version yet)
app.patch("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { name, registration_no, email, password, age } = req.body

    const result = await pool.query(
      `UPDATE users
       SET name = $1,
           registration_no = $2,
           email = $3,
           password = $4,
           age = $5
       WHERE id = $6
       RETURNING *`,
      [name, registration_no, email, password, age, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0]
    });

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Delete Endpoint
app.delete("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: result.rows[0]
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Something went wrong"
    })
  }
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000.")
})