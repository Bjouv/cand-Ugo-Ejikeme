import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import {TruckStatus} from "../models/truck";
import mongoose from "mongoose";

export const validateCreateTruckRequest = (req: Request, res: Response, next: NextFunction) => {
    const truckSchema = Joi.object({
        make: Joi.string().required(),
        year: Joi.number().required(),
        capacity: Joi.number().required(),
        status: Joi.string().valid(...Object.values(TruckStatus)).default(TruckStatus.Available),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    });

    const { error } = truckSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        res.status(400).json({ errors: errorMessages });
        return;
    }

    next();
};

export const validateGetTrucksNearbyRequest = (req: Request, res: Response, next: NextFunction) => {
    const querySchema = Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        rad: Joi.number().default(10),
    });

    const { error, value } = querySchema.validate(req.query, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
};

export const validateTruckId = (req: Request, res: Response, next: NextFunction) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID Format' });
        return;
    }

    next();
};


