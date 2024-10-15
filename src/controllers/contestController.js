const tokenService = require('../services/tokenService');

async function distributeContestRewards(players) {
  for (const player of players) {
    const { publicKey, rewardAmount } = player;
    await tokenService.sendTokens(publicKey, rewardAmount, process.env.ISSUING_SECRET, process.env.DISTRIBUTION_SECRET);
  }
  return { message: 'Rewards distributed' };
}

module.exports = {
  distributeContestRewards,
};