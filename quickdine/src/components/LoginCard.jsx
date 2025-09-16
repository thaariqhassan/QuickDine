import { useState, useEffect, React } from "react";
import axios from "axios";
import "../componentStyles/LoginCard.css"
import { blue, green } from "@mui/material/colors";

function LoginCard({className, showLoginCard, closeLoginCard}) {
    if (!showLoginCard) return null;
    
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });

   // Fetch all users
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);



  // Add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/", form);
      setUsers([...users, res.data]); // update list
      setForm({ name: "", email: "" }); // clear form
    } catch (err) {
      console.error(err);
    }
  }
  //Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className={className}>
      <h1>Log In</h1>

      <form className="login-form" onSubmit={() =>{handleSubmit}}>
        <div>
            <label>Full Name</label>
            <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="login-name"
            placeholder="Name"
            required
            />
        </div>

        <div>
            <label>Email Address</label>
            <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="login-email"
            required
            />
        </div>
        <div className="login-btn-holder">
            <button className="login-btn" type="reset" style={{backgroundColor: blue}} onClick={closeLoginCard}>Back</button>
            <button className="login-btn" type="submit" style={{backgroundColor: green}} onClick={handleSubmit}>Add User</button>
        </div>

      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default LoginCard
