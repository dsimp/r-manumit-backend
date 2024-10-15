const tokenService = require('../services/tokenService');
const playerProgress = {}; // Temporary storage for player tree planting count

async function plantTree(req, res) {
  const { publicKey } = req.body;

  // Record player progress (This could be moved to a database later)
  if (!playerProgress[publicKey]) {
    playerProgress[publicKey] = 0;
  }
  playerProgress[publicKey] += 1;

  try {
    // Issue token reward for planting a tree (Example: 1 token per tree)
    await tokenService.sendTokens(publicKey, 1, process.env.ISSUING_SECRET, process.env.DISTRIBUTION_SECRET);
    res.status(200).json({ success: true, message: 'Tree planted successfully and token rewarded!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to plant tree and reward tokens' });
  }
}

module.exports = {
  plantTree,
};