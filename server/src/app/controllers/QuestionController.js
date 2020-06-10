import Question from '../schemas/Question';

class QuestionController {
  async store(req, res) {
    const { description, alternatives, content } = req.body;

    const question = await Question.create({
      description,
      alternatives,
      content,
    });

    return res.json(question);
  }

  async index(req, res) {
    const { id } = req.params;

    const questions = await Question.find({ content: id });

    return res.json(questions);
  }
}

export default new QuestionController();
