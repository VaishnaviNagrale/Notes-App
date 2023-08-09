
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const Notes = require('./models/notes')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
const port = 3000

// connection to database
mongoose.connect("mongodb://127.0.0.1:27017/webnotes")
.then(()=>console.log("connection successful......"))
.catch((err)=>console.log(err));

//end points to serve the html
app.get('/', (req, res) => {
  res.sendFile('pages/index.html',{root: __dirname})
})

app.get('/app.js', (req, res) => {
  res.sendFile('pages/index.html',{root: __dirname})
})

app.get('/login', (req, res) => {
  res.sendFile('pages/login.html',{root: __dirname})
})

app.get('/signup', (req, res) => {
  res.sendFile('pages/signup.html',{root: __dirname})
})

app.get('*',(req,res)=>{
  res.sendFile('pages/404.html',{root: __dirname})
})

//end points to get api's

app.post('/login',async (req, res) => {
 await User.findOne(req.body)
    .then(user => {
      if (!user) {
        res.status(200).json({ success: false, message: "No user found!" })
      } else {
        res.status(200).json({ success: true, user: { email: user.email }, message: "User found!" });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ success: false, message: "An error occurred while finding the user." });
    });
});


app.post('/signup', async (req, res) => {
  try {
    const { usertoken } = req.body;
    console.log(req.body);
    let user = await User.create(req.body);

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Failed to create user.' });
  }
});

app.post('/addnote',async (req, res) => {
  try {
    const { usertoken } = req.body;
    console.log(req.body);
    let note = await Notes.create(req.body);

    res.status(200).json({ success: true, note: note });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ success: false, error: 'Failed to create note.' });
  }
})

app.post('/getnotes',async (req, res) => {
  let notes = await Notes.findOne({email: req.body.email})
  res.status(200).json({ success: true, notes });
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})