import Wallet from '../models/Wallet';
import QuestionDone from '../schemas/QuestionDone';

class ScoreController {
  async store(req, res) {
    const { amount } = await Wallet.findOne({ where: { user_id: req.userId } });

    const score = amount + 10;

    await Wallet.update({ amount: score }, { where: { user_id: req.userId } });

    return res.json({ score });
  }

  async index(req, res) {
    const { amount } = await Wallet.findOne({ where: { user_id: req.userId } });

    return res.json(amount);
  }
}

export default new ScoreController();
