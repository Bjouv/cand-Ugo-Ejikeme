import { Request, Response } from 'express';
import Truck from '../models/truck';

export const createTruck = async (req: Request, res: Response) => {
    try {
        const truck = new Truck({
            make: req.body.make,
            year: req.body.year,
            capacity: req.body.capacity,
            status: req.body.status,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
            },
        });

        res.status(201).json(await truck.save());
    } catch (error) {
        res.status(500).json({ message: 'Truck creation failed' });
    }
};

export const getTruck = async (req: Request, res: Response) => {
    const truck = await Truck.findOne({ _id: req.params.id });

    if (!truck) {
        res.status(404).json({ message: 'Truck not found' });
        return;
    }

    res.json(truck);
};

export const getAllTrucks = async (req: Request, res: Response) => {;
    res.json(await Truck.find({}));
};

export const getTrucksNearby = async (req: Request, res: Response) => {
    const { lat, lon, rad } = req.query;
    const radius = parseFloat(rad as string) || 10;

    const nearbyTrucks = await Truck.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(lat as string), parseFloat(lon as string)],
                },
                $maxDistance: radius * 1000,
            },
        },
    });

    res.json(nearbyTrucks);
};
