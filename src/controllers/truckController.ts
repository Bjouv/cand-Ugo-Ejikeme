import { Request, Response } from 'express';
import Truck from '../models/truck';

export const createTruck = async (req: Request, res: Response) => {
    try {
        const newTruckData = {
            make: req.body.make,
            year: req.body.year,
            capacity: req.body.capacity,
            status: req.body.status,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
            },
        };

        const truck = new Truck(newTruckData);
        const savedTruck = await truck.save();

        res.json(savedTruck);
    } catch (error) {
        res.status(500).json({ message: 'Truck creation failed' });
    }
};

export const getTruck = async (req: Request, res: Response) => {
    const truckId = req.params.id;

    const truck = await Truck.findOne({ _id: truckId });

    if (truck) {
        res.json(truck);
    } else {
        res.status(404).json({ message: 'Truck not found' });
    }
};

export const getAllTrucks = async (req: Request, res: Response) => {
    const trucks = await Truck.find({});
    res.json(trucks);
};

export const getTrucksNearby = async (req: Request, res: Response) => {
    const { lat, lon, rad } = req.query;
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lon as string);
    const radius = parseFloat(rad as string) || 10;

    const nearbyTrucks = await Truck.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: radius * 1000,
            },
        },
    });

    res.json(nearbyTrucks);
};
