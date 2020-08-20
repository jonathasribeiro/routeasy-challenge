import { Router } from 'express';

import DeliveryController from './controllers/DeliveryController';

const routes = new Router();

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.delete('/deliveries', DeliveryController.delete);

export default routes;
