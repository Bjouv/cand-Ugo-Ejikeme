import Truck, {TruckStatus} from './models/truck';
import connectDB from './config/dbConn';

export const seedData = [
    {
        make: "Toyota",
        year: 2023,
        capacity: 5000,
        status: TruckStatus.Available,
        location: {
            type: "Point",
            coordinates: [-74.0060, 40.7128]
        }
    },
    {
        make: "Ford",
        year: 2022,
        capacity: 6000,
        status: TruckStatus.InUse,
        location: {
            type: "Point",
            coordinates: [-75.0060, 41.7128]
        }
    },
    {
        make: "Chevrolet",
        year: 2021,
        capacity: 7500,
        status: TruckStatus.Maintenance,
        location: {
            type: "Point",
            coordinates: [-76.0060, 42.7128]
        }
    },
    {
        make: "Honda",
        year: 2023,
        capacity: 5500,
        status: TruckStatus.Available,
        location: {
            type: "Point",
            coordinates: [-77.0060, 43.7128]
        }
    },
    {
        make: "Nissan",
        year: 2022,
        capacity: 7000,
        status: TruckStatus.InUse,
        location: {
            type: "Point",
            coordinates: [-78.0060, 44.7128]
        }
    },
    {
        make: "Dodge",
        year: 2021,
        capacity: 6000,
        status: TruckStatus.Maintenance,
        location: {
            type: "Point",
            coordinates: [-79.0060, 45.7128]
        }
    },
    {
        make: "Kia",
        year: 2023,
        capacity: 6500,
        status: TruckStatus.Available,
        location: {
            type: "Point",
            coordinates: [-80.0060, 46.7128]
        }
    },
    {
        make: "Subaru",
        year: 2022,
        capacity: 8000,
        status: TruckStatus.InUse,
        location: {
            type: "Point",
            coordinates: [-81.0060, 47.7128]
        }
    },
    {
        make: "Volkswagen",
        year: 2021,
        capacity: 7000,
        status: TruckStatus.Maintenance,
        location: {
            type: "Point",
            coordinates: [-82.0060, 48.7128]
        }
    },
    {
        make: "Mazda",
        year: 2023,
        capacity: 7500,
        status: TruckStatus.Available,
        location: {
            type: "Point",
            coordinates: [-83.0060, 49.7128]
        }
    }
];

connectDB()
    .then(async () => {
        await Truck.deleteMany({});
        await Truck.insertMany(seedData);
        console.log('Seed data added to the collection.');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
