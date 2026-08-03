import React from "react";
import { useEffect, useState } from "react";
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
    const password = e.target.password.value;
    const userData = { username, password };

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Backend Response:", data);
      setSignupMessage(data.msg || (response.ok ? "Signup successful!" : "Signup failed"));
    } catch (err) {
      console.error("Error:", err);
      setSignupMessage("Could not reach server");
    }
  }

  async function loginSubmit(e: any) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const userData = { username, password };

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/Problemset";
      } else {
        setLoginMessage(data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setLoginMessage("Could not reach server");
    }
  }

  return (
    <Router>
      <div className="topnav flex flex-wrap items-center gap-x-6 gap-y-2 bg-[#0d1117] border-b border-[#232935] px-4 sm:px-6 py-3">
        <span className="font-['IBM_Plex_Mono',monospace] text-[#e3b341] font-bold text-base sm:text-lg mr-0 sm:mr-8">
          {"</>"} CodeBase
        </span>
        <a className="active text-[#e6edf3] hover:text-[#e3b341] text-sm">Home</a>
        <a className="text-[#8b949e] hover:text-[#e3b341] text-sm" href="/Signup">Signup</a>
        <a className="text-[#8b949e] hover:text-[#e3b341] text-sm" href="/Login">Login</a>
        <a className="text-[#8b949e] hover:text-[#e3b341] text-sm" href="/Problemset">Problemset</a>
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

export default App;
