import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createTruck, getTruck, getAllTrucks, getTrucksNearby } from '../controllers/truckController';
import {validateCreateTruckRequest, validateGetTrucksNearbyRequest, validateTruckId} from "../middlewares/requestValidator";

const truckRouter = Router();

truckRouter.get('/', asyncHandler(getAllTrucks));
truckRouter.get('/nearby', validateGetTrucksNearbyRequest, asyncHandler(getTrucksNearby));
truckRouter.get('/:id', validateTruckId, asyncHandler(getTruck));
truckRouter.post('/', validateCreateTruckRequest, asyncHandler(createTruck));

export default truckRouter;
