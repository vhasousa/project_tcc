import Wallet from '../models/Wallet';
import QuestionDone from '../schemas/QuestionDone';

class ScoreController {
  async store(req, res) {
    const done = await QuestionDone.find({
      questions: {
        $elemMatch: {
          question: req.params.id,
        },
      },
    });

    const { amount } = await Wallet.findOne({ where: { user_id: req.userId } });

    if (done) {
      const score = amount;
      return res.json({ score });
    }

    const score = amount + 1;

    await Wallet.update({ amount: score }, { where: { user_id: req.userId } });

    return res.json({ score });
  }

  async index(req, res) {
    const { amount } = await Wallet.findOne({ where: { user_id: req.userId } });

    return res.json(amount);
  }
}

export default new ScoreController();
