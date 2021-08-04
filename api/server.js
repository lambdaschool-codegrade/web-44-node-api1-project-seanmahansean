// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");
const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({
      message: "The users information could not be retrieved"
    })
    console.log(err);
  })
})

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
  .then(user => {
    if(!user){
      res.status(404).json({
        message: "The user with the specified ID does not exist"
      })
    }else{
      res.status(201).json(user);
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "The user could not be removed"
    })
    console.log(err);
  })
})

server.post("/api/users", (req, res) => {
  const reqUser = req.body;
  if(!reqUser.name || !reqUser.bio){
    res.status(400).json({
      message: "Please provide name and bio for the user"
    })
  }else{
    Users.insert(reqUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      })
      console.log(err);
    })
  }
})

server.delete("/api/users/:id", (req, res) => {
  const reqUser = req.body;
  if(!reqUser.id){
    res.status(404).json({
      message: "Please provide name and bio for the user"
    })
  }else{
    Users.remove(reqUser)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "The user could not be removed"
      })
      console.log(err);
    })
  }
})

server.put("/api/users/:id", (req, res) => {
  const reqUser = req.body;
  if(!reqUser.id){
    res.status(400).json({
      message: "Please provide name and bio for the user"
    })
  }else{
    Users.update(reqUser)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "The user could not be added"
      })
      console.log(err);
    })
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
