import { Router } from 'express';

import authMiddleware from '../../middlewares/auth';

import TesteController from './Teste/TesteController';
// import exampleValidation from './Teste/exampleValidation';

const routes = new Router();

// -------------------------------------------------------------------------- //
// ------------------------------- ROTAS LIVRE ------------------------------ //
// -------------------------------------------------------------------------- //

// --------------------------------- DEFAULT ---------------------------------//
routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'API is running' });
});

// -------------------------------- TESTE ------------------------------------//
routes.get('/teste', TesteController.index);
routes.get('/teste/:id', TesteController.find);
routes.post('/teste', TesteController.store);
routes.put('/teste/:id', TesteController.update);
routes.delete('/teste/:id', TesteController.delete);
// routes.post('/teste', exampleValidation, TesteController.store);

// -------------------------------------------------------------------------- //
// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
// -------------------------------------------------------------------------- //

routes.use(authMiddleware);

// ----------------------------AUTH TESTE ------------------------------------//
routes.get('/auth/teste', TesteController.index);

// ---------------------------- DEFAULT COM TOKEN ----------------------------//
routes.get('/auth/token', (req, res) => {
  return res.status(200).json({
    auth: true,
    message: 'API is running and token is valid',
  });
});

export default routes;
