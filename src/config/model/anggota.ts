import mongoose from "mongoose";

const anggotaSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    nim: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    angkatanId: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    }

}, { timestamps: true })

const AnggotaModel = mongoose.model("Anggota", anggotaSchema)

export { AnggotaModel };
