import * as Yup from 'yup';
import Grade from '../models/Grade';

class GradeController {
  async store(req, res) {
    /**
     * Verify if the grade is more than 4, and permit just fundamental level
     */
    const schema = Yup.object().shape({
      number: Yup.number().integer().required().moreThan(0).lessThan(10),
      level: Yup.string()
        .required()
        .when('number', (number, field) => {
          return number > 4
            ? field.oneOf(['Fundamental'])
            : field.oneOf(['Fundamental', 'Médio']);
        }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Validations fail' });
    }
    const grade = await Grade.create(req.body);

    return res.json(grade);
  }

  async index(req, res) {
    const grades = await Grade.findAll({
      attributes: ['id', 'number', 'level'],
    });

    return res.json(grades);
  }
}

export default new GradeController();
