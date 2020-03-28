var express = require('express');
var router = express.Router();
const facebook = require("./facebook");

// READ
router.get('/get', facebook.readCampaign)

// POST
router.post('/post', facebook.createCampaign)

// PUT
router.put('/put', facebook.updateCampaign)

// DELETE
router.delete('/delete', facebook.deleteCampaign)


module.exports = router;