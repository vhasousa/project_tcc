// import * as Yup from 'yup';
// import Lesson from '../models/Lesson';
// import Module from '../models/Module';
// import Content from '../models/Content';
// import Attach from '../models/Attach';
// import User from '../models/User';
// import Grade from '../models/Grade';

// class LessonController {
//   async store(req, res) {
//     const schema = Yup.object().shape({
//       title: Yup.string().required(),
//       description: Yup.string().required(),
//       module_id: Yup.number().required(),
//       grade_id: Yup.number().required(),
//     });

//     if (!(await schema.isValid(req.body))) {
//       return res.status(401).json({ message: 'Validations fail' });
//     }

//     const lesson = req.body;

//     const { title, description, module_id, grade_id } = lesson;

//     /**
//      * Verify if the module and grade been registered exists in data base
//      */

//     const moduleExists = await Module.findOne({ where: { id: module_id } });

//     if (!moduleExists) {
//       return res.status(400).json({ message: 'Module does not exists!' });
//     }

//     const gradeExists = await Grade.findOne({ where: { id: grade_id } });

//     if (!gradeExists) {
//       return res.status(400).json({ message: 'Grade does not exists!' });
//     }

//     await Lesson.create(lesson);

//     return res.json({ title, description, module_id, grade_id });
//   }

//   async index(req, res) {
//     /**
//      * Searching for all the content through modules in the lessons
//      * brind content customized based on the grade of the user
//      */
//     const user = await User.findOne({ where: { id: req.userId } });

//     const { grade_id } = user;

//     const lesson = await Lesson.findAll({
//       where: { grade_id },
//       attributes: ['title', 'description'],
//       include: [
//         {
//           association: 'module',
//           attributes: ['number', 'description'],
//           include: [
//             {
//               association: 'contents',
//               attributes: ['title', 'content'],
//               through: {
//                 attributes: [],
//               },
//               include: [
//                 {
//                   model: Attach,
//                   as: 'attaches',
//                   attributes: ['name', 'path', 'url'],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });
//     return res.json(lesson);
//   }
// }

// export default new LessonController();
