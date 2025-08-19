import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        type: {type: String, default: 'equipment'},
        location: {type: String, default: ''},
        status: {type: String, enum: ['available', 'checked-out', 'maintenance'], default: 'available'},
        notes: {type: String, default: ''}
    },
    { timestamps: true }
)

export default mongoose.model("Asset", AssetSchema);