import mongoose from "mongoose";

const acaraSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: false
    },
    endTime: {
        type: Date,
        required: false
    },
    isOpen: {
        type: Boolean,
        required: false,
        default: true
    },
}, { timestamps: true })

const AcaraModel = mongoose.model("Acara", acaraSchema)

export { AcaraModel };
