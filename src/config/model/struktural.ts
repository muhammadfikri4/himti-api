import mongoose from "mongoose";

const strukturalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nim: {
        type: Number,
        required: true,
        unique: true
    },
    jabatan: {
        type: String,
        required: false,
        unique: true
    },
    angkatanId: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
    },
    imageUrl: {
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
