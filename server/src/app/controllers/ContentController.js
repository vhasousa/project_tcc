import Content from '../models/Content';
import Module from '../models/Module';
import User from '../models/User';
import Attach from '../models/Attach';
import Question from '../schemas/Question';

class ContentController {
  async store(req, res) {
    const contents = await Content.create(req.body);

    return res.json(contents);
  }

  async index(req, res) {
    const user = await User.findOne({ where: { id: req.userId } });

    const { grade_id } = user;

    const content = await Content.findAll({
      attributes: ['id'],
      include: [
        {
          association: 'modules',
          attributes: [],
          through: {
            attributes: [],
          },
          where: { grade_id },
        },
      ],
    });

    return res.json(content);
  }

  async show(req, res) {
    const { id } = req.params;

    const content = await Content.findOne({
      where: { id },
      attributes: ['title', 'content'],
      include: [
        {
          model: Attach,
          as: 'attaches',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json({ content, questions });
  }
}

export default new ContentController();
