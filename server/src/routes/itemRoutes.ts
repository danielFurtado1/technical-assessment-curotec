import { Router } from 'express';
import * as itemController from '../controllers/itemController';

const router = Router();

router
  .get('/items', itemController.getItems)
//   .post('/items', itemController.createItem)  fix: bug with the overload parameters
  .put('/items/:id', itemController.updateItem)
  .delete('/items/:id', itemController.deleteItem);

export default router;