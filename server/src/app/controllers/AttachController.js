import Attach from '../models/Attach';

class AttachController {
  async store(req, res) {
    const { grade_id } = req.params;
    const { originalname: name, filename: path } = req.file;

    const file = await Attach.create({ name, path, grade_id });

    return res.json(file);
  }

  async index(req, res) {
    const { grade_id } = req.params;
    const file = await Attach.findOne({ where: { grade_id } });

    const { url } = file;

    return res.json(url);
  }
}

export default new AttachController();
