import Module from '../models/Module';
import Content from '../models/Content';
import Attach from '../models/Attach';

class ModuleController {
  async store(req, res) {
    const modules = await Module.create(req.body);

    return res.json(modules);
  }

  async index(req, res) {
    const { grade_id } = req.params;

    const module = await Module.findAll(
      { where: { grade_id } },
      {
        attributes: ['id', 'number', 'description'],
        include: [
          {
            association: 'contents',
            through: {
              attributes: [],
            },
            attributes: ['title', 'content'],
            include: [
              {
                model: Attach,
                as: 'attaches',
                attributes: ['name', 'path', 'url'],
              },
            ],
          },
        ],
      }
    );

    return res.json(module);
  }
}

export default new ModuleController();
