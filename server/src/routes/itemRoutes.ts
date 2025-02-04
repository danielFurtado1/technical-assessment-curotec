import { Router } from 'express';
import * as itemController from '../controllers/itemController';

const router = Router();

// here are the routes for the server, usually separated by entities, with only changing the verb to make the requests

router
  .get('/', itemController.getItems)
  .post('/', itemController.createItem)
  .put('/:id', itemController.updateItem)
  .delete('/:id', itemController.deleteItem);

export default router;