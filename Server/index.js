const express = require('express');
const DB_Handler = require('./ServerApi/Db_Handler')
const Files_Handler = require('./ServerApi/Files_Handler')
const path = require('path');
const router = express.Router();
var cors = require('cors');
// set up express app
const app = express();
app.use(cors());

app.use('/' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/Teacher-Profile' , express.static(path.normalize(__dirname + '/build')));
app.use( '/Student-Profile' , express.static(path.normalize(__dirname + '/build')));
app.use( '/signout-student' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signout-teacher' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/adding-exams'    ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signin-student'  ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signin-teacher'  ,express.static(path.normalize(__dirname + '/build')));
app.use( '/Teacher-Profile/' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/Student-Profile/' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signout-student/' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signout-teacher/' ,express.static(path.normalize(__dirname + '/build')));
app.use( '/adding-exams/'    ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signin-student/'  ,express.static(path.normalize(__dirname + '/build')));
app.use( '/signin-teacher/'  ,express.static(path.normalize(__dirname + '/build')));

app.use('/', (req , res) => {
    console.log(req.url);
      // Handling data base  requests----------------------------------->
      let db = new DB_Handler;
      db.db(req, res);

      let file = new Files_Handler;
      file.files(req , res);
});

// listen to the local server
app.listen(process.env.PORT || 3001, () => {
    console.log("The server has started");
});