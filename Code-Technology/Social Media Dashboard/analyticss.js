const express = require('express');
const { getAnalytics } = require('../analytics/engagement');
const router = express.Router();

router.get('/overview', async (req, res) => {
  res.json(await getAnalytics());
});
module.exports = router;
