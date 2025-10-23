import { useState, useEffect, React } from "react";
import axios from "axios";
import "../componentStyles/LoginCard.css"
import { useNavigate } from 'react-router'


function LoginCard({className, showLoginCard, closeLoginCard, setAccess,setIsRestaurant}) {
    if (!showLoginCard) return null;
    
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" ,password: "",is_restaurant: false});
    const [form1, setForm1] = useState({email: "" ,password: ""});
    const [accountExists,setAccountExists] = useState(true)
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


  // Add user
  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/", form);
      setUsers([...users, res.data]); // update list
      setForm({ name: "", email: "" }); // clear form
      alert("User Created Successfully")
    } catch (err) {
      console.error(err);
    }
  }

  // SignIn user
  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage(""); // reset previous message

    try {
      const res = await axios.post("http://127.0.0.1:8000/login", form1);
      // Login successful
      const userId = res.data.user_id;
      const is_restaurant = res.data.is_restaurant;
      setIsRestaurant(is_restaurant);
      setMessage(`Logged In Successfully`);
      //spcce for login card closing IMPORTANT LINE 66-68 has to be placed here
      // it is placed below for smoother testing purposes only
      console.log("Login Successful");
      localStorage.setItem("user_id",userId);
      localStorage.setItem("user_name",res.data.user_name);
      localStorage.setItem("user_email",res.data.user_email);
      console.log(res.data.user_name);
      console.log(userId);
      // TODO: Store JWT or session here if implemented
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMessage("Invalid email or password.");
      } else {
        setMessage("Server error. Please try again later.");
      }
    }
    setAccess(true);
    alert("Login successfull");
    closeLoginCard();
    navigate("/restaurants");
  };

  //Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className={className}>
      <h1>{accountExists ? "Sign In" : "Log In"}</h1>

      <form className="login-form" onSubmit={accountExists? handleSignIn : handleLogInSubmit}>

        {accountExists ? null : 
          (
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
          )
        }
        

        <div>
            <label>Email Address</label>
            <input
            name="email"
            value={accountExists ? form1.email : form.email}
            onChange={accountExists ? handleChange1 : handleChange}
            placeholder="Email"
            className="login-email"
            required
            />
        </div>

        <div>
            <label>Password</label>
            <input
            name="password"
            value={accountExists ? form1.password : form.password}
            onChange={accountExists ? handleChange1 : handleChange}
            type="password"
            placeholder="Password"
            className="login-pwd"
            required
            />
        </div>

        <div className="login-sign">
          <div>{accountExists ? "Don't have an Account?" : "If you have an account"}</div>
          <div onClick={() => setAccountExists(!accountExists)}>{accountExists ? "Login" : "Sign In"}</div>
          <div onClick={() => navigate("/registerRestaurant")}>{accountExists ? "":"register as a restaurant"}</div>
          <div onClick={() => {
            setIsRestaurant(true);
            closeLoginCard();
            //localStorage.setItem("user_id",userId);
            navigate("/dashboard");
          }}>restaurant dashboard shortcut</div>
        </div>
        

        {accountExists ? 
          (
            <div className="login-btn-holder">
              <button className="login-btn" type="reset" style={{backgroundColor: 'rgba(89, 88, 89, 1)'}} onClick={closeLoginCard}>Back</button>
              <button className="login-btn" type="submit" style={{backgroundColor: 'rgb(173, 71, 104)'}} onClick={handleSignIn}>Sign In</button>
            </div>
          ) :
          (
            <div className="login-btn-holder">
              <button className="login-btn" type="reset" style={{backgroundColor: 'rgba(89, 88, 89, 1)'}} onClick={closeLoginCard}>Back</button>
              <button className="login-btn" type="submit" style={{backgroundColor: 'rgb(173, 71, 104)'}} onClick={handleLogInSubmit}>Add User</button>
            </div>
          )
        }
      </form>
        <div>{message}</div>
    </div>
    </>
  );
}

export default LoginCard
