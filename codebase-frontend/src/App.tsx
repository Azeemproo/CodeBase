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
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav className="bg-[#0d1117] border-b border-[#232935] px-4 sm:px-6 py-3 relative">
        <div className="flex items-center justify-between">
          <span className="font-['IBM_Plex_Mono',monospace] text-[#e3b341] font-bold text-base sm:text-lg">
            {"</>"} CodeBase
          </span>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            <a className="text-[#e6edf3] hover:text-[#e3b341] text-sm">Home</a>
            <a className="text-[#8b949e] hover:text-[#e3b341] text-sm" href="/Signup">Signup</a>
            <a className="text-[#8b949e] hover:text-[#e3b341] text-sm" href="/Login">Login</a>
            <a className="text-[#8b949e] hover:text-[#e3b341] text-sm" href="/Problemset">Problemset</a>
          </div>

          {/* Hamburger button - mobile only */}
          <button
            className="sm:hidden text-[#e6edf3] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col gap-1 mt-3 pt-3 border-t border-[#232935]">
            <a className="text-[#e6edf3] hover:text-[#e3b341] text-sm py-2" onClick={() => setMenuOpen(false)}>Home</a>
            <a className="text-[#8b949e] hover:text-[#e3b341] text-sm py-2" href="/Signup" onClick={() => setMenuOpen(false)}>Signup</a>
            <a className="text-[#8b949e] hover:text-[#e3b341] text-sm py-2" href="/Login" onClick={() => setMenuOpen(false)}>Login</a>
            <a className="text-[#8b949e] hover:text-[#e3b341] text-sm py-2" href="/Problemset" onClick={() => setMenuOpen(false)}>Problemset</a>
          </div>
        )}
      </nav>
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