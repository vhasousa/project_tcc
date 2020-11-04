import Module from '../schemas/Module';
import User from '../models/User';

class ModuleController {
  async store(req, res) {
    const module = await Module.create(req.body);

    return res.json(module);
  }

  async index(req, res) {
    const user = await User.findOne({ where: req.userId });

    const { grade_id } = user;

    const modules = await Module.find({ grade_id });

    return res.json(modules);
  }
}

export default new ModuleController();
