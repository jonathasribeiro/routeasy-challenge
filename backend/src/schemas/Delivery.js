import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        address: {
            place: {
                type: String,
                required: true,
            },
            number: {
                type: String,
                required: true,
            },
            neighborhood: {
                type: String,
                required: true,
            },
            complement: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            geolocation: {
                lat: {
                    type: Number,
                    required: true,
                },
                lng: {
                    type: Number,
                    required: true,
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Deliveries', DeliverySchema);
