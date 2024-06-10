import mongoose from "mongoose";

const angkatanSchema = new mongoose.Schema({
    angkatan: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true })

const AngkatanModel = mongoose.model("Angkatan", angkatanSchema)

export { AngkatanModel };
