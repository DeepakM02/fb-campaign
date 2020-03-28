const adsSdk = require('facebook-nodejs-business-sdk');
const constant = require('./constant')
const api = adsSdk.FacebookAdsApi.init(constant.ACCESS_TOKEN);
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;
const account = new AdAccount(constant.ACCOUNT_ID);
var campaigns;

// Create campaign
const createCampaign = (req, res) => {
    account
        .createCampaign(
            [],
            {
                "special_ad_category": 'NONE',
                [Campaign.Fields.name]: 'Page likes campaign',
                [Campaign.Fields.status]: Campaign.Status.paused,
                [Campaign.Fields.objective]: Campaign.Objective.page_likes
            }
        )
        .then((result) => {
            res.json({ status: true, data: campaigns })
        })
        .catch((error) => {
            res.json({ status: false, message: error.message })
        });
}


// Read campaign with pagination
const readCampaign = (req, res) => {
    account.read([AdAccount.Fields.name])
        .then((account) => {
            return account.getCampaigns([Campaign.Fields.name], { limit: req.query.limit || 10 }) // fields array and params
        })
        .then((result) => {
            campaigns = result

            // campaigns.forEach((campaign) => console.log(campaign.name))
            res.json({ status: true, data: campaigns })
        }).catch((error) => {
            res.json({ status: false, message: error.message })
        });
}


const updateCampaign = (req, res) => {
    if (!req.body.campaignId || !req.body.campaignName) {
        return res.status(401).send({
            status: false,
            message: "CampaignId and CampaignName both are required"
        })
    }
    new Campaign(campaignId, {
        [Campaign.Fields.id]: req.body.campaignId,
        [Campaign.Fields.name]: req.body.campaignName || 'Campaign - Updated'
    })
        .update()
        .then(result => {
            res.json({ status: true, message: "Updated Successfully" })
        }).catch((error) => {
            res.json({ status: false, message: error.message })
        });
}


// Delte campaign 
const deleteCampaign = (req, res) => {
    if (req.body.campaignId) {
        return res.status(401).send({
            status: false,
            message: "CampaignId are requried"
        })
    }

    let campaignId = req.query.campaignId;
    new Campaign(campaignId).delete()
        .then(result => {
            res.json({ status: true, message: "Deleted Successfully" })
        }).catch((error) => {
            res.json({ status: false, message: error.message })
        });
}

module.exports = {
    createCampaign: createCampaign,
    readCampaign: readCampaign,
    updateCampaign: updateCampaign,
    deleteCampaign: deleteCampaign
}