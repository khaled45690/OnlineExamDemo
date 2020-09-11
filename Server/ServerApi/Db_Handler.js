let db;
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://khaledsaad:khaledsaad45680@cluster0-p8cto.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
 // console.log("u connected to the database");

  db = client.db("Data");
  let x = new ObjectID();
 // console.log(x);

  // perform actions on the collection object
  //   client.close();
});


module.exports = class DB {
  db(req, res) {
    if (req.url === '/Asignin') {
      req.on('data', (data) => {
        var body = JSON.parse(data);
        db.collection("users").findOne({ "email": body.email, "password": body.password }, (err, result) => {
          if (result === null) {
            let respond = { "msg": "the password or email or wrong please try agan" }
            res.end(JSON.stringify(respond))
          } else {
            let respond = { "msg": "you have logged in succesfully", "result": result }
            res.end(JSON.stringify(respond))
          }

        });

      })
    }

    if (req.url === '/Asignout') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
        db.collection("users").findOne({ "email": body.email }, (err, result) => {
          if (result === null) {
            db.collection("users").insertOne(body, (err, respond) => {
              let responds = { "state": "succed", "respond": "the account has been created successfully please go back and try to sign in" }
              res.end(JSON.stringify(responds));

            });

          } else {
            let responds = { "state": "failed", "respond": "your account is used before" }
            res.end(JSON.stringify(responds));
          }
        });
      });
    }




    if (req.url === '/SaveExam') {
      req.on('data', (data) => {
        var body = JSON.parse(data);

       // console.log(JSON.stringify(body));

        res.end(JSON.stringify("u saved the exam successfully"));

        db.collection("Exams").insertOne(body, (err, respond) => {

          res.end(JSON.stringify("u saved the exam successfully"));

        });


      })
    }




    if (req.url === '/GetUserInfo') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
        let x = "" + body;
       // console.log(x);

       // console.log(body);
        db.collection("users").findOne({ "_id": ObjectID(body) }, (err, result) => {
         // console.log(result);

          if (result === null) {

            let responds = { "msg": "failed to find this id" }
            res.end(JSON.stringify(responds));
          } else {
            let responds = { "msg": "done", "body": result }
            res.end(JSON.stringify(responds));
          }
        });
      });
    }



    if (req.url === '/UpdateUserInfo') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
        let x = body.UpdatedUser;
       // console.log(x);

       // console.log(body);
        db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: x }, (err, result) => {
         // console.log(result);

          if (result === null) {

            let responds = { "msg": "failed to find this id" }
            res.end(JSON.stringify(responds));
          } else {
            let responds = { "msg": "done", "body": result }
            res.end(JSON.stringify(responds));
          }
        });
      });
    }



    if (req.url === '/SearchForTeacher') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


       // console.log(body);
        db.collection("users").find({ "AccountType": "Teacher" }).toArray((err, result) => {
         // console.log(result);
          if (result === null) {

            let responds = { "msg": "failed to find this id" }
            res.end(JSON.stringify(responds));
          } else {
            var a = result.filter(function (el) {
              if (el.Teachinglevels[body]) {
                return el.Teachinglevels[body] === body;
              }
            });
           // console.log("4555555555555555555555555555555555555555555555");
           // console.log(a);
            let responds = { "msg": "done", "body": a }
            res.end(JSON.stringify(responds));
          }
        });
      });
    }



    if (req.url === '/RegisterationForTeacher') {
      req.on('data', function (data) {
        var body = JSON.parse(data);

       // console.log(body.StudentId);

        db.collection("users").find({ "_id": ObjectID(body.TeacherId) }).toArray((err, result) => {
         // console.log(result[0].requests);

          if (result[0].requests) {
            let requests = result[0].requests

            db.collection("users").updateOne({ "_id": ObjectID(body.TeacherId) }, { $set: { "requests": requests.concat([body.StudentId]) } }, (err, result) => { })
            res.end(JSON.stringify("your request has been made"))



          } else {
           // console.log(result[0].requests);
            let requests = [body.StudentId]
            db.collection("users").updateOne({ "_id": ObjectID(body.TeacherId) }, { $set: { "requests": [body.StudentId] } }, (err, result) => {
              res.end(JSON.stringify("your request has been made"))
            })

          }


        });
      });
    }



    if (req.url === '/pendingRequests') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("users").find({ "_id": ObjectID(body) }).toArray((err, result) => {
         // console.log(result[0].requests);
          let data = {}
          let x = result[0].requests;
          Promise.all(

            Object.keys(x).map(function (key, i) {
              return (new Promise(function (resolve) {
                db.collection("users").findOne({ "_id": ObjectID(x[i]) }, (err, result) => {
                  resolve(result);
                })
              }))
            })
          ).then(function (data) {
           // console.log(data);
            res.end(JSON.stringify(data))
           // console.log("i mad code async");

          })
        });
      });
    }

    if (req.url === '/addedRequests') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("users").find({ "_id": ObjectID(body) }).toArray((err, result) => {
         // console.log(result[0].accepted);
          let data = {}
          if (result[0].accepted) {
            let x = result[0].accepted;
           // console.log(x);
           // console.log("-------------------------------------------------------------->>>");

            Promise.all(

              Object.keys(x).map(function (key, i) {
                return (new Promise(function (resolve) {
                 // console.log(x);

                  db.collection("users").findOne({ "_id": ObjectID(x[i]) }, (err, result) => {
                    resolve(result);
                  })
                }))
              })
            ).then(function (data) {
             // console.log(data);
              res.end(JSON.stringify(data))
             // console.log("i mad code async");

            })
          } else {
            res.end(JSON.stringify([]));
          }
        });
      });
    }


    if (req.url === '/refusedRequests') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("users").find({ "_id": ObjectID(body) }).toArray((err, result) => {
         // console.log(result[0].refused);
          let data = {}
          if (result[0].refused) {
            let x = result[0].refused;
            Promise.all(

              Object.keys(x).map(function (key, i) {
                return (new Promise(function (resolve) {
                  db.collection("users").findOne({ "_id": ObjectID(x[i]) }, (err, result) => {
                    resolve(result);
                  })
                }))
              })
            ).then(function (data) {
             // console.log(data);
              res.end(JSON.stringify(data))
             // console.log("i mad code async");

            })
          } else {
            res.end(JSON.stringify([]));
          }

        });
      });
    }






    if (req.url === '/AddStudent') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("users").findOne({ "_id": ObjectID(body.UserId) }, (err, result) => {
         // console.log(body.Fromvar);
          let removed = result[body.Fromvar].filter((value) => {
            return value !== body.StudentId
          })
         // console.log(removed);

          res.end(JSON.stringify("done"))



          db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: { [body.Fromvar]: removed } }, (err, resultssssssss) => {
           // console.log(result.accepted);

            if (result.accepted) {
              let x = result.accepted.concat(body.StudentId);
             // console.log(x);

              db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: { "accepted": x } }, (err, result) => {
                res.end(JSON.stringify("done"))
              })
            } else {
              db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: { "accepted": [body.StudentId] } }, (err, result) => {
                res.end(JSON.stringify("done"))
               // console.log(body.StudentId);
              })
            }
          })
        });
      });
    }






    if (req.url === '/DeclineStudent') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("users").findOne({ "_id": ObjectID(body.UserId) }, (err, result) => {
         // console.log(body.Fromvar);

          let removed = result[body.Fromvar].filter((value) => {
            return value !== body.StudentId
          })
         // console.log(removed);

          res.end(JSON.stringify("done"))



          db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: { [body.Fromvar]: removed } }, (err, resultsssssssssssssssssssss) => {
            if (result.refused) {
             // console.log(result.refused.concat(body.StudentId));

              db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: { "refused": result.refused.concat(body.StudentId) } }, (err, result) => {
                res.end(JSON.stringify("done"))
              })
            } else {
              db.collection("users").updateOne({ "_id": ObjectID(body.UserId) }, { $set: { "refused": [body.StudentId] } }, (err, result) => {
                res.end(JSON.stringify("done"))
               // console.log(body.StudentId);
              })
            }
          })



        });
      });
    }






    if (req.url === '/GetUserAvailableExam') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("users").find({ "AccountType": "Teacher" }).toArray((err, result) => {
         // console.log(result);
          let filter = result.filter((value) => {
            let x = value
            if (value.accepted) {
             // console.log("-------------------------------------->>>>>>>>>");
             // console.log(value.accepted.some(o => o === body.UserId));
              if (value.accepted.some(o => o === body.UserId)) {
                return x
              }

            }

          })

         // console.log("-------------------================>>>>");
         // console.log(filter);

          let data = Promise.all(filter.map(function (obj) {
            return (new Promise(function (resolve) {

              let find = { "TeacherId": obj._id  }
             // console.log(JSON.stringify(find));

              db.collection("Exams").find(JSON.stringify(find)).toArray((err, result) => {
                let x = result.filter((value) => {
  
                        return(value.academic_year === body.Academic_year)

                })
               // console.log(x);


               
               
             let r = x.map((value)=>{
                return {...value , ["TeacherName"]: obj.name }
              })
           
             // console.log(r);
                resolve(r)



              })
            })




            )
          }))


          data.then((data) => {
           // console.log("================-------------------================>>>>");
           // console.log(data);
            res.end(JSON.stringify(data))
          })
        });
      });
    }




    if (req.url === '/GetExam') {
      req.on('data', function (data) {
        var body = JSON.parse(data);


        db.collection("Exams").findOne({ "_id": ObjectID(body) }, (err, result) => {
         // console.log(result);
          res.end(JSON.stringify(result))

        })
      })
    }



    if (req.url === '/SaveAnswer') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
       // console.log(body);


        db.collection("Answers").findOne({ "StudentId": body.StudentId }, (err, result) => {
         // console.log(result);
          if (result === null) {
            db.collection("Answers").insertOne(body, (err, respond) => {
             // console.log(respond.insertedId);
             // console.log(body.ExamId);

              db.collection("Exams").findOne({ "_id": ObjectID(body.ExamId) }, (err, resultx) => {
               // console.log(resultx);
                let data = {
                  StudentName: body.StudentName,
                  AnswerId: respond.insertedId
                }
                let x = new ObjectID();
               // console.log(x);
                let fela = {
                  ...resultx,
                  TheExamedStudent: { ...resultx.TheExamedStudent, ["data" + x]: data }
                }


               // console.log(fela);

                db.collection("Exams").updateOne({ "_id": ObjectID(body.ExamId) }, { $set: fela }, (err, resultssssssss) => { })

                res.end(JSON.stringify("done"));
              })

            })
          } else {

          }

        })
      })
    }





    if (req.url === '/GetAllExamsAvailableThatNeedToBeCorrected') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
       // console.log(body);


        db.collection("Exams").find(body).toArray((err, result) => {
         // console.log(result);
          let fliter = result.filter((key) => {
           // console.log(key);
            if (key["TheExamedStudent"]) {
              return key
            }
          })

         // console.log(fliter);
          res.end(JSON.stringify(fliter))

        })
      })
    }


    if (req.url === '/GetAnswer') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
       // console.log(body);


        db.collection("Answers").findOne({ "_id": ObjectID(body) }, (err, result) => {
         // console.log(result);

          res.end(JSON.stringify(result))

        })
      })
    }





    if (req.url === '/SaveResult') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
       // console.log(body);
        let filter = {}

        db.collection("Exams").findOne({ "_id": ObjectID(body.ExamId) }, (err, result) => {
          let TheExamedStudent = result.TheExamedStudent;
          Promise.all(Object.keys(TheExamedStudent).filter((value, i) => {
            return (new Promise((resolve) => {
              let data = TheExamedStudent[value]
              if (JSON.stringify(data.AnswerId) === JSON.stringify(body.AnswerId)) {

              } else {
                filter = { ...filter, data }
                resolve(data)
              }
            }))
          })).then((data)=>{
            result.TheExamedStudent = filter;
            db.collection("Exams").updateOne({ "_id": ObjectID(body.ExamId) }, {$set:result} , (err, result) => {})
 
            
            
          })

          res.end(JSON.stringify("done"))

        })


        db.collection("Answers").removeOne({ "_id": ObjectID(body.AnswerId) }, (err, result) => {

        });


        db.collection("Results").insertOne(body, (err, result) => {
console.log("inserted");

        })


      })
    }


    if (req.url === '/StudentPercentage') {
      req.on('data', function (data) {
        var body = JSON.parse(data);
       // console.log(body);

        db.collection("Results").find(body).toArray((err, result) => {
         // console.log(result);
          
          res.end(JSON.stringify(result))
        })


    })
  }



  if (req.url === '/getStudentExams') {
    req.on('data', function (data) {
      var body = JSON.parse(data);
     // console.log(body);

      db.collection("Results").find(body).toArray((err, result) => {
       // console.log(result);
        
        res.end(JSON.stringify(result))
      })


  })
}



if (req.url === '/getStudentResult') {
  req.on('data', function (data) {
    var body = JSON.parse(data);
   console.log(body);
   let datas = []

    db.collection("Results").find({"StudentId":body}).toArray((err, result) => {
    result.map((value)=>{
        datas.push(value)
      })
   
     db.collection("Answers").find({"StudentId":body}).toArray((err, resultsss) => {
       Promise.all(resultsss.map((value=>{
         return(new Promise((resolve)=>{
          datas.push(value)
          resolve("done")
         }))
       }))).then((data)=>{
        console.log(datas);
        res.end(JSON.stringify(datas))
       })
     
      

    
    
    })
      
      
    })


})
}



  }
};