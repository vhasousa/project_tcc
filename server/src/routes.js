import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authConfig from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import GradeController from './app/controllers/GradeController';
import SchoolController from './app/controllers/SchoolController';
import QuestionController from './app/controllers/QuestionController';
import ScoreController from './app/controllers/ScoreController';
import ModuleController from './app/controllers/ModuleController';
import InvestmentController from './app/controllers/InvestmentController';
import AttachController from './app/controllers/AttachController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/sessions/confirmation/:token', SessionController.update);
routes.post('/sessions/confirmation', SessionController.resend);
routes.post('/sessions/recover', SessionController.passwordRecovery);
routes.get('/sessions/reset/:token', SessionController.verifyToken);
routes.put('/users/reset', UserController.resetPassword);
routes.get('/grades', GradeController.index);
routes.get('/schools', SchoolController.index);

routes.use(authConfig);

routes.post('/files/:grade_id', upload.single('file'), AttachController.store);
routes.get('/files/:grade_id', AttachController.index);
routes.post('/schools', SchoolController.store);
routes.post('/grades', GradeController.store);
routes.post('/questions', QuestionController.store);
routes.post('/modules', ModuleController.store);
routes.post('/answer/:id', ScoreController.store);
routes.put('/users', UserController.update);
routes.get('/users', UserController.show);
routes.get('/questions/:module_id', QuestionController.index);
routes.get('/modules', ModuleController.index);
routes.get('/score', ScoreController.index);
routes.post('/score/:id', ScoreController.store);
routes.get('/investment', InvestmentController.index);
routes.post('/investment', InvestmentController.store);

export default routes;
