import Attach from '../models/Attach';

class AttachController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await Attach.create({ name, path });

    return res.json(file);
  }

  async index(req, res) {
    const file = await Attach.findAll();

    const { url } = file;

    return res.json(file);
  }
}

export default new AttachController();
