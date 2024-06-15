import mongoose from "mongoose";

const strukturalSchema = new mongoose.Schema({
    anggotaId: {
        type: String,
        required: true
    },

    jabatan: {
        type: String,
        required: false,
        unique: true
    },
    image: {
        type: String,
        required: false,
    },
    instagram: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    facebook: {
        type: String,
        required: false,
    },
    linkedin: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    }

}, { timestamps: true })

const StrukturalModel = mongoose.model("Struktural", strukturalSchema)

export { StrukturalModel };
