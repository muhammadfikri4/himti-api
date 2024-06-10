import mongoose from "mongoose";

const dosenSchema = new mongoose.Schema({
    nidn: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    numberPhone: {
        type: Number,
        required: false
    },
    mataKuliah: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    }

}, { timestamps: true })

const DosenModel = mongoose.model("Dosen", dosenSchema)

export { DosenModel };
