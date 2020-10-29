import mongoose from 'mongoose';
import Module from '../schemas/Module';

class ModuleController {
  async store(req, res) {
    const module = await Module.create(req.body);

    return res.json(module);
  }

  async index(req, res) {
    const modules = await Module.find();

    const { id, number, description } = modules;

    return res.json(modules);
  }
}

export default new ModuleController();
