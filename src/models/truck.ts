import mongoose from 'mongoose'

export enum TruckStatus {
    Available = 'Available',
    InUse = 'In Use',
    Maintenance = 'Maintenance',
    Other = 'Other',
}

const truckSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(TruckStatus),
        default: TruckStatus.Available,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
}, {
    versionKey: false,
});

const Truck = mongoose.model('TruckModel', truckSchema);

Truck.collection.createIndex({ location: '2dsphere' }).then(() => {
    console.log('Truck collection indexed');
}).catch((err) => {
    console.log('Truck collection indexing failed', err);
});

export default Truck
