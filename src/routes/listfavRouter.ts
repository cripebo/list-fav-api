import express from 'express';
import { testMiddle } from '../middleware/testMiddle';
import * as ListaFavController from '../controllers/listfavController';

const router = express.Router();

router.get('/lists', testMiddle, ListaFavController.getLists);
router.get('/list/user/:id', ListaFavController.getListsByUser);
router.get('/list/:id', ListaFavController.getListById);
router.post('/list', ListaFavController.createList);
router.put('/list', ListaFavController.updateList);
router.delete('/list', ListaFavController.deleteList);
router.get('*', (_, res) => res.status(404).send());

export default router;