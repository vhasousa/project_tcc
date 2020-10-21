import * as Yup from 'yup';
import Content from '../models/Content';
import User from '../models/User';
import Attach from '../models/Attach';
import Question from '../schemas/Question';

class ContentController {
  async store(req, res) {
    const content = await Content.create(req.body);

    return res.json(content);
  }

  async index(req, res) {
    const user = await User.findOne({ where: { id: req.userId } });

    const { grade_id } = user;

    const content = await Content.findAll({
      where: { grade_id },
      include: [
        {
          model: Attach,
          as: 'attaches',
          attributes: ['name', 'path', 'url'],
        },
      ],
      attributes: ['title'],
    });

    return res.json(content);
  }

  async show(req, res) {
    const { id } = req.params;

    const content = await Content.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          association: 'modules',
          attributes: [],
          through: {
            attributes: [],
          },
          where: { id },
        },
      ],
    });

    return res.json(content);
  }

  async detail(req, res) {
    const { id } = req.params;

    const content = await Content.findOne({
      where: { id },
      attributes: ['id', 'title', 'content'],
      include: [
        {
          model: Attach,
          as: 'attaches',
          attributes: ['name', 'path', 'url'],
        },
        {
          association: 'modules',
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json(content);
  }
}

export default new ContentController();
