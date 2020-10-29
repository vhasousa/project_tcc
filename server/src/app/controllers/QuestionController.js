import Question from '../schemas/Question';

class QuestionController {
  async store(req, res) {
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
