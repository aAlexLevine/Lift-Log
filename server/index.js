var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');
// var items = require('../database-mongo');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())

app.get('/items', function (req, res) {
  console.log('fireeddd')
  db.selectAll()
  .then( (response) => {
      // console.log(response)
      res.send(response)
    })
    .catch((err)=> {
      console.log(err)
    })
});

app.post('/createNewWorkout', (req, res) => {
  //run DB method takes  promise and catch 
  console.log('body--',req.body)
  db.createNewWorkOut(req.body)
    .then(response => {
      console.log('Response from DB, recieved at server createNewWorkOut', response)
      res.send(response)
    })
    .catch(err => console.log('error, server, createNewWorkOut', err))
})

app.get('/getPlans', (req, res) => {
  db.getPlans(req.query.user)
    .then( response => res.send(response))
    .catch( err => console.log(err))
})

app.get('/getGroups', (req, res) => {
  db.getGroups(req.query.id)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

app.get('/getExercisesByGroup', (req, res) => {
  db.getExercisesByGroup(req.query.groupID)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

app.post('/insertSets', (req, res) => {
  db.insertSets(req.body)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

app.get('/getLastThreeLogIds', (req, res) => {
  const {userID, planID, group} = req.query
  db.getLastThreeLogIds(userID, planID, group)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

app.get('/getSetsRestByLogid', (req, res) => {
  console.log('server log id', req.query.logID)
  db.getSetsRestByLogid(req.query.logID)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

app.get('/getAllWorkoutLogsByGroup', (req, res) => {
  const {userID, planID, group} = req.query
  db.getAllWorkoutLogsByGroup(userID, planID, group)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

