var express = require('express');
var router = express.Router();
const facebook = require("./facebook");

// READ
router.get('/getCampaign', facebook.readCampaign)

// POST
router.post('/createCampaign', facebook.createCampaign)

// PUT
router.put('/updateCampaign', facebook.updateCampaign)

// DELETE
router.delete('/deleteCampaign', facebook.deleteCampaign)


module.exports = router;