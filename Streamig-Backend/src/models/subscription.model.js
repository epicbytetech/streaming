import mongoose, {Schema} from "mongoose";

const SubscriptionSchema = new Schema({
    name: {
        type: String,
        required: true,  //'Basic', 'Premium'
    },
    price: {
        type: Number,
        required: true,  
    },
    duration: {
        type: String,
        required: true,  //'monthly', 'yearly'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'paused'],
        default: 'inactive',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    // features could be assigned based on th subscription type
    features: {
        type: [String], // ['HD', 'Ad-Free', 'Offline Access']
    },
}, {
    timestamps: true
});

export const Subscription = mongoose.model('Subscription', SubscriptionSchema);

