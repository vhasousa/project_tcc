import mongoose from 'mongoose';
import User from '../models/User';
import Question from '../schemas/Question';
import QuestionDone from '../schemas/QuestionDone';

class ScoreController {
  async store(req, res) {
    const { alternative } = req.body;

    /**
     * Verify if question have been done
     */

    const done = await QuestionDone.find({
      questions: {
        $elemMatch: {
          question: req.params.id,
        },
      },
    });

    if (done[0]) {
      return res.status(400).json({ message: 'Question already made' });
    }

    /**
     * Search for the question in the body of the request where
     * isCorrect is true and the id is equal from the id in the body
     */

    const question = await Question.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $unwind: '$alternatives' },
      {
        $match: {
          $and: [
            {
              'alternatives._id': mongoose.Types.ObjectId(alternative),
            },
            { 'alternatives.isCorrect': true },
          ],
        },
      },
    ]);

    if (!question[0]) {
      return res.json({ message: 'eroouu' });
    }

    /**
     * Verify if the user already make some question, if not, create an row
     * with this user_id. And, when the question is made, the array of questions
     * push the id of this question.
     */

    const userExists = await QuestionDone.findOne({ user_id: req.userId });

    if (!userExists) {
      await QuestionDone.create({ user_id: req.userId });
    }

    await QuestionDone.findOneAndUpdate({
      $push: {
        questions: {
          $each: [{ question: req.params.id }],
        },
      },
    });

    return res.json({ message: 'Correto' });
  }

  async index(req, res) {
    const list = await QuestionDone.find({});

    return res.json(list);
  }
}

export default new ScoreController();
