import School from '../models/School';

class SchoolController {
  async store(req, res) {
    const { grades, ...data } = req.body;
    const school = await School.create(data);

    if (grades && grades.length > 0) {
      school.setGrades(grades);
    }

    return res.json(school);
  }

  async index(req, res) {
    const schools = await School.findAll({ attributes: ['id', 'name'] });

    return res.json(schools);
  }
}

export default new SchoolController();
