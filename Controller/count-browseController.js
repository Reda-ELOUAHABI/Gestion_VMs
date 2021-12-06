const mongoose = require("mongoose");
const CountBrowse = require('../Models/countBrowse');

// I used the same DB as Movies app :  database name is 'movies' : inside uri
var uri = "mongodb://movie1:movie@cluster0-shard-00-00.c4sms.mongodb.net:27017,cluster0-shard-00-01.c4sms.mongodb.net:27017,cluster0-shard-00-02.c4sms.mongodb.net:27017/movies?ssl=true&replicaSet=atlas-3al5ka-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log('connected successfuly');
}).catch((err) => {
    console.log("connection failed");
});


const postBrowse = async (req, res) => {
    // Validate request
    // if (!req.body.title) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }

    // console.log(req.headers)
    // console.log(req)
    // console.log(req.socket.remoteAddress)
    // console.log(req.headers['x-forwarded-for'])

    // let ip = req.headers['x-forwarded-for'] ||
    //     req.socket.remoteAddress || req.ip  //express has req.ip
    //     || null;

    let ip = "host = " + req.headers.host + " \n user agent= " + req.headers['user-agent'];

    let today = new Date()

    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    console.log("???????????????????????????????|||||||||||||||||||||||");
    const { siteweb } = req.body;
    // console.log(siteweb);
    let connections = await CountBrowse.find().exec();
    // console.log(connections);

    // find() will return only the first element
    let maxCount = "0"
    const countConnectionList = connections.filter((f => {
        // console.log(f);
        if (f.siteweb == siteweb) {

            if (f.countConnections > maxCount) {

                maxCount = f.countConnections;
            }
        }
    }))



    ++maxCount;
    const createdCountBrowse = new CountBrowse({ date: dateTime, countConnections: maxCount, adressIp: ip, siteweb });
    //    using mongoose
    const result = await createdCountBrowse.save();
    // res.json({ message: "created successfuly" })
    res.status(201).json(result);

    //  https://www.bezkoder.com/node-express-mongodb-crud-rest-api/
    //   // Create a Tutorial
    //   const tutorial = new Tutorial({
    //     title: req.body.title,
    //     description: req.body.description,
    //     published: req.body.published ? req.body.published : false
    //   });

}

const getAll = async (req, res) => {
    let result = await CountBrowse.find().exec();
    if (!result || result.length === 0) {
        return res.json({ message: "Connections does not Exist" });
    }
    res.json({ result });
}

const getConnectionBySite = async (req, res) => {
    siteweb = req.params.uid; //params = {uid: '11'}

    let connections = await CountBrowse.find().exec();
    // find() will return only the first element
    const connectioOfSiteWeb = connections.filter((f => {
        return f.siteweb === siteweb;
    }))

    if (!connectioOfSiteWeb || connectioOfSiteWeb.length === 0) {
        // const filmNotExist = new HttpError("film does not Exist", 404);
        // throw filmNotExist;
        return res.json("siteweb do not Exist", 404);;
        // OR for async [DB ...] :
        // return next( new HttpError("user not found",404));
    }
    res.json({ connectioOfSiteWeb });

}

const deleteById = async (req, res) => {
    const id = req.params.id;

    CountBrowse.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Vm with id=${id}. Maybe Vm was not found!`
                });
            } else {
                res.send({
                    message: "Vm was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vm with id=" + id
            });
        });
}


const deleteAll = async (req, res) => {
    CountBrowse.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} CountBrowse were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all CountBrowse."
            });
        });
}
exports.postBrowse = postBrowse
exports.getAll = getAll
exports.deleteById = deleteById
exports.deleteAll = deleteAll
exports.getConnectionBySite = getConnectionBySite

// Call example: GET 
// http://localhost:3000/api/countBrowse/http--githubpages-pdfGenerator


// Usage
/*
<body onload="loadingFunction()">
  <script>

    function loadingFunction() {


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      var rawsite = JSON.stringify({
        "siteweb": "http--githubpages-pdfGenerator"
      });

      const api_count_browse = "http://localhost:3000/api/countBrowse";

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawsite,
        redirect: 'follow'
      };

      fetch(api_count_browse, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


      //     setTimeout(function() {
      //         alert(Region2API+"\ تمت اضافته بنجاح");
      // location.reload();
      //     }, 3000);
      // }
    }
  </script>

*/
