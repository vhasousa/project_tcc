import Investment from '../models/Investment';
import Wallet from '../models/Wallet';

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

  async redeem(req, res) {
    const { redeem_value } = req.body;

    const { investment_value } = await Investment.findOne({
      where: { user_id: req.userId },
    });

    const { amount } = await Wallet.findOne({ where: { user_id: req.userId } });

    if (redeem_value > investment_value) {
      return res.status(400).json({
        message:
          'You can not redeem a value bigger than you have in your investment!',
      });
    }

    const redeem = investment_value - redeem_value;
    await Investment.update(
      { investment_value: redeem },
      { where: { user_id: req.userId } }
    );

    await Wallet.update(
      { amount: amount + redeem_value },
      { where: { user_id: req.userId } }
    );

    return res.json(amount + redeem_value);
  }
}

export default new InvestmentController();
