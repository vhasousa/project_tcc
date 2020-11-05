import Investment from '../models/Investment';
import Wallet from '../models/Wallet';
import QuestionDone from '../schemas/QuestionDone';

class InvestmentController {
  async index(req, res) {
    const { investment_value } = await Investment.findOne({
      where: { user_id: req.userId },
    });

    return res.json(investment_value);
  }

  async store(req, res) {
    /**
     * Get the value user wants to invest
     */
    const { investment } = req.body;

    /**
     * Search for the amount of points in the wallet
     */
    const { amount } = await Wallet.findOne({ where: { user_id: req.userId } });
    /**
     * Search for the amount of points invested
     */
    const { investment_value } = await Investment.findOne({
      where: { user_id: req.userId },
    });

    /**
     * Verify if the value been invested is bigger than the value in the wallet
     */
    if (investment > amount) {
      return res.status(400).json({
        message:
          'You can not invest a value bigger than you have in your account!',
      });
    }

    /**
     * Value thar will be discount from the wallet
     */
    const value = amount - investment;
    await Wallet.update({ amount: value }, { where: { user_id: req.userId } });
    /**
     * The value that will be invested
     */
    await Investment.update(
      { investment_value: investment_value + investment },
      { where: { user_id: req.userId } }
    );

    return res.json(investment_value + investment);
  }

  // async update(req, res) {
  //   const value = await Investment.update({ where: { user_id: req.userId } });

  // }
}

export default new InvestmentController();
