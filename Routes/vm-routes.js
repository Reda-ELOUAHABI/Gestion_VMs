
const express = require('express');
const router = express.Router();

const commentController = require('../Controller/vm-controller');


router.get("/vm", commentController.getAllVms)
router.put("/vm/:id", commentController.patchVm)
router.post("/vm", commentController.postVm)

module.exports = router;
