import express from 'express';
const app = express()
const port = 4000
import  jwt from "jsonwebtoken";
import "dotenv/config";
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(express.json())
import {authMiddleware} from './middleware.js';
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173" // your frontend URL
}));

const users = [];
const SUBMISSIONS = [];
app.get('/', (req, res) => {
  res.send("hello world")
})

  const problems = [{
    id: 0,
    title: "Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "42%"
  }, {
    id: 1,
    title: "Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "412%"
  },
  {
    id: 2,
    title: "Happy Number",
    difficulty: "Easy",
    acceptance: "54.9%"
  },
  {
    id: 3,
    title: "Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "42%"
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Medium",
    acceptance: "42%"
  }, {
    id:5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "412%"
  },
  {
    id:6,
    title: "Zigzag Conversion",
    difficulty: "Easy",
    acceptance: "54.9%"
  },
  {
    id:7,
    title: "Reverse Integer",
    difficulty: "Hard",
    acceptance: "42%"
  }
  ];

app.get('/signup', (req,res) => {
  // Add logic to decode body 
  // should have email and password 

  // store email and password 


  res.render(`homepage.ejs`)
})


app.post('/api/signup', (req, res) => {
  const {username, password } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(403).json({msg:'Username already exists.'});

  users.push({username,password});
  console.log(users)
  res.json({
    msg: "success"
  })
})

app.post('/api/login', (req, res) => {
  const {username,password} = req.body
  const  user = users.find(u => u.username === username);
  if (!user) return  res.status(400).send("user not found")
  
  if (user.password !== password){
    return res.status(403).json({msg:"incorrect password"})
  }
  
  const token = jwt.sign({
    id : user.id
  },process.env.JWT_SECRET)


  return res.json({token});

})

app.get('/login', (req,res) => {
  res.render("loginpage.ejs")
})

app.get('/problems', (req, res) => {
  const filteredPromblems = problems.map(x => ({
    id :x.id,
    title : x.title,
    difficulty : x.difficulty,
    acceptance : x.acceptance,
  }))
    res.json({
      problems: filteredPromblems
    })
});     
app.get('/problem/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  const problem = problems.find(x => x.id == id)
  if(!problem){
    return res.status(411).json({});
  }
  res.json({
    problem
  })
})


app.get('/submissions/:problemId',authMiddleware ,(req, res) => {
    const problemId= req.params.problemId;
    const submissions = SUBMISSIONS.filter(x => x.problemId === problemId && x.userId === req.userId);
    console.log(submissions)
    res.json({
      submissions,
    })
})

app.post('/submission',(req, res) => {
  const iscorrect = Math.random() < 0.5
  const problemId = req.body.problemId;
  const submission = req.body.submission;

  if (iscorrect){
    SUBMISSIONS.push({
      submission,
      problemId,
      userId : req.userId,
      status : "AC"
  })
  res.json({
    status : "AC"
  })
  }
  else{
    SUBMISSIONS.push({
      submission,
      problemId,
      userId : req.userId,
      status : "WA"
  })
  res.json({
    status : "WA"
  })
  }
})

app.get("/dashboard",authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});

app.get('')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// letting the user sign in and sign up
// getting all the problems from the backend 
// getting the description of the problem along the block where you write the code 
// when you click the submit button it will accept or reject solution randomly.

