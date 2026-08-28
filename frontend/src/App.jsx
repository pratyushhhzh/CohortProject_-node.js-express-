import { useState } from "react"
import "./App.css"


function App(){
  //login page 
  const [page, setPage] = useState("register");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [name, setName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  //for alert message:
 const[message, setMessage] = useState("")

 // Login
const handleLogin = async (event) => {
  event.preventDefault();

  setLoginMessage("");

  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword
    })
  });

  const data = await response.json();

  if (response.ok) {
    setPage("welcome");
    return;
  }

  if (response.status === 401) {
    setLoginMessage("Wrong Email ID / Password");
  }
};

 // handle submit 
  const handleSubmit = async (event) => {
  event.preventDefault();
  const response = await fetch("http://localhost:5000/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    registration_no: registrationNo,
    email: email,
    password: password,
    age: age
  })
});
const data = await response.json();
//409 error display through alert
if(response.status === 409){
  setMessage("User Registration no./Email ID already in use. Please LOGIN")
  return;
}
if(response.ok){
  setMessage("Registration successful"),
  setPage("welcome")
}
//printing it out
console.log(data);
};

  // WELCOME PAGE
  if (page === "welcome") {
  return (
    <div className="welcome-page">
      <h1>WELCOME</h1>
      <br></br>
      <p>Builder's Cohort</p>
    </div>
  );
}

  // Login Page Code (LOGIN FORM)
  if (page === "login") {
  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div className="form-row">
          <label>Email</label>

          <input
            type="email"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Password</label>

          <input
            type="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      {loginMessage && <p>{loginMessage}</p>}

      <p>
        Don't have an account?
        <button
          type="button"
          onClick={() => setPage("register")}>
          Register
        </button>
      </p>
    </>
  );
}

  return(
    <>
    <h1>Cohort Task 1 !</h1>
    <br/>
    <h2> Create Account </h2>
    <form onSubmit={handleSubmit}>
        <div>
          <div className="form-row">
          <label>Name</label>
          <input type="text" value={name}
          onChange={(event) => setName(event.target.value)} required />
          </div>
        </div>

        <br />

        <div>
          <div className="form-row">
          <label>Registration Number</label>
          <input type="text" value={registrationNo}
          onChange={(event) => setRegistrationNo(event.target.value)} required/>
          </div>
        </div>

        <br />

        <div>
          <div className="form-row">
          <label>Email</label>
          <input type="email" value={email}
          onChange={(event) => setEmail(event.target.value)} required/>
          </div>
        </div>

        <br />

        <div>
          <div className="form-row">
          <label>Password</label>
          <input type="password" minLength="6" value={password}
          onChange={(event) => setPassword(event.target.value)} required/>
          </div>
        </div>

        <br />

        <div>
          <div className="form-row">
          <label>Age</label>
          <input type="number" min="16" max="70" value={age}
          onChange={(event) => setAge(event.target.value)} required />
          </div>
        </div>

        <br />

       {message && <p>{message}</p>}

        <button type="submit">Register</button>

        <p>Already have an account ?
          <button type="button" onClick={()=> setPage("login")}>
            Login
          </button>
        </p>

      </form>
    </>
  )
}

export default App;