var fs = require('fs');
const ObjectID = require('mongodb').ObjectID;
module.exports = class DB {
    files(req, res) {
        if (req.url === "/MakeExamImageName") {
            console.log("enter");
            var body = '';
            let x = new ObjectID();
            console.log(x);
            req.on('data', function (data) {
                body += data;

                //  console.log(body);

                let base64Data = body.split(',')[1];

                fs.writeFile(`${"./Examimages/image" + x}`, base64Data, 'base64', function (err) {
                });
                


            })

            res.send( JSON.stringify(`${"Examimages/image" + x}`));



        }
    }
};