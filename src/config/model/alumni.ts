import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({

    angkatanId: {
        type: String,
        required: true
    },

    anggotaId: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    }

}, { timestamps: true })

const AlumniModel = mongoose.model("Alumni", alumniSchema)

export { AlumniModel };
