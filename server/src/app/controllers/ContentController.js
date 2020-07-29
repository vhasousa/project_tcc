import * as Yup from 'yup';
import Content from '../models/Content';
import Module from '../models/Module';
import User from '../models/User';
import Attach from '../models/Attach';
import Question from '../schemas/Question';

class ContentController {
  // async store(req, res) {
  //   const contents = await Content.create(req.body);

  //   return res.json(contents);
  // }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
      modules: Yup.array(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /**
     * Receives in the body of the request all the contents related to this modules
     * and the data from this module.
     */
    const { modules, ...data } = req.body;

    // const [...module] = modules;

    const content = await Content.create(data);

    if (modules && modules.length > 0) {
      content.setModules(modules);
    }

    return res.json(content);
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
