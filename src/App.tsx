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
import './App.css'




  // const problems1 = [{
  //   id: 0,
  //   title: "Bitwise AND of Numbers Range",
  //   difficulty: "Medium",
  //   acceptance: "42%"
  // }, {
  //   id: 1,
  //   title: "Bitwise AND of Numbers Range",
  //   difficulty: "Medium",
  //   acceptance: "412%"
  // },
  // {
  //   id: 2,
  //   title: "Happy Number",
  //   difficulty: "Easy",
  //   acceptance: "54.9%"
  // },
  // {
  //   id: 3,
  //   title: "Remove Linked List Elements",
  //   difficulty: "Hard",
  //   acceptance: "42%"
  // }
  // ];
  // const problems2 = [{
  //   id: 4,
  //   title: "Median of Two Sorted Arrays",
  //   difficulty: "Medium",
  //   acceptance: "42%"
  // }, {
  //   id:5,
  //   title: "Longest Palindromic Substring",
  //   difficulty: "Medium",
  //   acceptance: "412%"
  // },
  // {
  //   id:6,
  //   title: "Zigzag Conversion",
  //   difficulty: "Easy",
  //   acceptance: "54.9%"
  // },
  // {
  //   id:7,
  //   title: "Reverse Integer",
  //   difficulty: "Hard",
  //   acceptance: "42%"
  // }
  // ];


/* Add routing here, routes look like -
   /Login - Login page
   /signup - Signup page
   /problemset/all/ - All problems (see problems array above)
   /problems/:problem_slug - A single problem page
 */

function App() {
  //  useEffect(() => {
  //   // Replace with your chosen API endpoint
  //   fetch('https://alfa-leetcode-api.onrender.com/problems')
  //     .then(res => res.json())
  //     .then(data => setProblems(data.problemsetQuestionList)) // Access the correct array
  //     .catch(err => console.error(err));
  // }, []);
  return (
    <Router>
      <div className="topnav">
        <a className="active" href="/">Home</a>
        <a href="/Signup">Signup</a>
        <a href="/Login">Login</a>
        {/* <a href="/Problem/:id">Problem</a> */}
        <a href="/Problemset">Problemset</a>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup handleSubmit = {handleSubmit}/>} />
        <Route path="/Login" element={<Login loginSubmit = {loginSubmit}/>} />
        <Route path="/Problem/:ProblemId" element={<ProblemDetail/>} />
        <Route path="/Problemset" element={<Problemset  />} />
      </Routes>
    </Router>
  );
}
// function ProblemStatement(props : any) {
//   const id = props.id;
//   const title = props.title;
//   const acceptance = props.difficulty
// //   const difficulty = props.acceptance;

// //   return(
// //    <div >
// //    <tr className="relative flex h-full w-full cursor-pointer items-center">
// //     <td className="p-2 text-sm text-gray-700" >
// //       {id}
// //     </td>
// //     <td className="p-2 text-sm text-gray-700">
// //       {title}
// //     </td>
// //     <td className="p-2 text-sm text-gray-700">
// //       {difficulty}
// //     </td>
// //     <td className="p-2 text-sm text-gray-700">
// //       {acceptance}
// //     </td>
// //   </tr>
// //   </div>
// //   )
// // }

 async function handleSubmit(e: any) {
  e.preventDefault();

  const username = e.target.name.value;
  const password = e.target.password.value
  const userData = { username, password }; 

  try {
    const response = await fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Backend Response:", data);
  } catch (err) {
    console.error("Error:", err);
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
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Backend Response:", data);
    localStorage.setItem("token", data.token);
    if (data.token) {
      window.location.href = "/Problem";
}
  } catch (err) {
    console.error("Error:", err);
  }
}

const token = localStorage.getItem("token");

fetch("/dashboard", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});



export default App;