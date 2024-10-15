const express = require('express');
const { distributeContestRewards } = require('../controllers/contestController');
const router = express.Router();

router.post('/distribute-rewards', async (req, res) => {
  const players = req.body.players;
  try {
    const result = await distributeContestRewards(players);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to distribute rewards' });
  }
});

module.exports = router;