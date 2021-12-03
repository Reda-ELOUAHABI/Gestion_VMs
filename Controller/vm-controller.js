const mongoose = require("mongoose");
const Vm = require('../Models/vm');

// I used the same DB as Movies app :  database name is 'movies' : inside uri
var uri = "mongodb://movie1:movie@cluster0-shard-00-00.c4sms.mongodb.net:27017,cluster0-shard-00-01.c4sms.mongodb.net:27017,cluster0-shard-00-02.c4sms.mongodb.net:27017/movies?ssl=true&replicaSet=atlas-3al5ka-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log('connected successfuly');
}).catch((err) => {
    console.log("connection failed");
});

const getAllVms = async (req, res) => {
    let result = await Vm.find().exec();
    if (!result || result.length === 0) {
        return res.json({ message: "vms does not Exist" });
    }
    res.json({ result });
}



const postVm = async (req, res) => {
    const { nom, adressIp, os, etat } = req.body;
    const createdVm = new Vm({ nom, adressIp, os, etat });
    //    using mongoose
    const result = await createdVm.save();
    // res.json({ message: "created successfuly" })
    res.status(201).json(result);
}

const patchVm = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "element to update can not be empty!"
        });
    }
    const id = req.params.id;
    Vm.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Vm with id=${id}. Maybe Vm was not found!`
                });
            } else res.send({ message: "Vm was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vm with id=" + id
            });
        });
}


const deleteVm = async (req, res) => {
    const id = req.params.id;

    Vm.findByIdAndRemove(id)
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

exports.postVm = postVm;
exports.patchVm = patchVm;
exports.getAllVms = getAllVms;
exports.deleteVm = deleteVm;
