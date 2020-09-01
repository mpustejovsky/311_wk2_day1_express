
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
let counter = 5;

const { users } = require('./state')

// //middleware

app.use(bodyParser.json());


/* BEGIN - create routes here */
// gets users through link written into the response
app.get('/', (req, res) => {
  res.send(`<a href="http://localhost:4000/users">Get Users</a>`);
});


app.get('/users', (req, res) => {
  res.json(users);

});


app.get("/users/:id", (req, res) => {
  console.log("test")
  const found = users.some(user => user._id == req.params.id);
  if (found) {
    res.send(users.filter(user => user._id == req.params.id));
  } else {
    res.status(400).json({ msg: `User id ${req.params.id} not found.` });
  }
});

app.post('/users', (req, res) => {

  counter++;

  const newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
  }
  //pushing the new user into the array
  users.push(newUser)
  //requesting the list of users
  res.json(users)
})

//put to update a user
app.put('/users/:id', (req, res) => {

  const found = users.find(user => user._id == req.params.id);
  console.log("found:", found._id)
  let index;
  if (found) {
    index = users.map(function (findIndex) { return findIndex._id; }).indexOf(found._id);
    console.log("here is index" + index)
    users[index] = {
      _id: found._id,
      name: req.body.name,
      occupation: req.body.occupation,
      avatar: req.body.avatar,
    }

    res.json(users[index])
  }
})

app.delete("/users/:id", (req, res) => {
  const found = users.find(user => user._id == req.params.id);
  if (found) {
    console.log(found._id)
    const userObject = users.filter(user => user._id == req.params.id);
    let index = users.map(function (findIndex) { return findIndex._id; }).indexOf(found._id);
    console.log(index)
    users[index].isActive = false
    res.send("msg: user set to inactive");
  } else {
    res.status(400).json({ msg: `User id ${req.params.id} not found.` });
  }
});

/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))