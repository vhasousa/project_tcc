import * as Yup from 'yup';
import Question from '../schemas/Question';
import QuestionDone from '../schemas/QuestionDone';

class QuestionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      correct_answer: Yup.string().required(),
      incorrect_answer: Yup.array().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Validations fail' });
    }

    const { question, correct_answer, incorrect_answer, module_id } = req.body;

    const questionnaire = await Question.create({
      question,
      correct_answer,
      incorrect_answer,
      module_id,
    });

    return res.json(questionnaire);
  }

  async index(req, res) {
    const { module_id } = req.params;

    const results = await Question.find({ module_id });

    return res.json({ results });
  }
}

export default new QuestionController();
