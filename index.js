//First Server
//npm init -y


const express = require('express')
const cors = require('cors');
const path = require('path');



const usersRoutes = require('./Routes/users-routes')
const vmRoutes = require('./Routes/vm-routes')
const countBrowseRoutes = require('./Routes/countBrowse-routes')
const HttpError = require("./Models/http-error");

const PORT = process.env.PORT || 3000;
var app = express()

app.use(cors())
app.use('/', express.static(path.join(__dirname, "Angular")));

app.use(express.json())


app.use("/api/users", usersRoutes)
app.use("/api", vmRoutes)
app.use("/api", countBrowseRoutes)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "Angular", "index.html"));
})

// error handling middleware with four argument in the function:
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "AN unknown error occurred !" });
})

// accept whatever the bad route
app.use((req, res) => {
  const error = new HttpError("bad Route .", 404);
  throw error;
});

app.all("*", (
  (req, res) => {
    res.status(401).
      send('<h1>resources not found bro</h1>')
  }
))

app.listen(PORT, function () {
  console.log(`server runing at http://localhost:${PORT}`)
});