import React from "react";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProblemDetail from './pages/Problem';
import Problemset from './pages/Problemset';
import './App.css';


function App() {
  const [signupMessage, setSignupMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  async function handleSubmit(e: any) {
  e.preventDefault();

  const username = e.target.name.value;
  const password = e.target.password.value
  const userData = { username, password }; 

  try {
    const response = await fetch("https://codebase-pfth.onrender.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Backend Response:", data);
    setSignupMessage(data.msg || (response.ok ? "signup successful" : 'Signup Failed'));
    if(response.ok){
      window.location.href = "/Login";
    }
  } catch (err) {
    console.error("Error:", err);
    setSignupMessage('could not reach server');
  }
}
async function loginSubmit(e: any) {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;
  const userData = { username, password }; 

  try {
    const response = await fetch("https://codebase-pfth.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Backend Response:", data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/Problemset";
}else{
  setLoginMessage(data.msg || 'Login Failed')

}
  } catch (err) {
    console.error("Error:", err);
    setLoginMessage('could not reach server')
  }
}
  return (
   <Router>
      <div className="topnav flex items-center bg-[#0d1117] border-b border-[#232935] px-6">
        <span className="font-['IBM_Plex_Mono',monospace] text-[#e3b341] font-bold text-lg mr-8">
          {"</>"} CodeBase
        </span>
        <a className="active text-[#e6edf3] hover:text-[#e3b341]" href="/">Home</a>
        <a className="text-[#8b949e] hover:text-[#e3b341]" href="/Signup">Signup</a>
        <a className="text-[#8b949e] hover:text-[#e3b341]" href="/Login">Login</a>
        <a className="text-[#8b949e] hover:text-[#e3b341]" href="/Problemset">Problemset</a>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup handleSubmit={handleSubmit} message={signupMessage} />} />
        <Route path="/Login" element={<Login loginSubmit={loginSubmit} message={loginMessage} />} />
        <Route path="/Problem/:ProblemId" element={<ProblemDetail/>} />
        <Route path="/Problemset" element={<Problemset  />} />
      </Routes>
    </Router>
  );
}

const token = localStorage.getItem("token");

fetch("/dashboard", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});


export default App;