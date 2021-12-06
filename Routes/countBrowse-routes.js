
const express = require('express');
const router = express.Router();

const countBrowseController = require('../Controller/count-browseController');


router.get("/countBrowse", countBrowseController.getAll)
router.get("/countBrowse/:uid", countBrowseController.getConnectionBySite)
// router.put("/vm/:id", commentController.patchVm)
// router.delete("/vm/:id", commentController.deleteVm)
router.post("/countBrowse", countBrowseController.postBrowse)

router.delete("/countBrowse/deleteAll", countBrowseController.deleteAll)
router.delete("/countBrowse/:id", countBrowseController.deleteById)

module.exports = router;
