import Writer from '../models/Writer';

class AuthorController {
  async store(req, res) {
    const author = await Writer.create(req.body);

    return res.json(author);
  }

  async index(req, res) {
    const author = await Writer.findAll({ attributes: ['id', 'name'] });

    return res.json(author);
  }
}

export default new AuthorController();
