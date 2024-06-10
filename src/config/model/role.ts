import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema)

export { UserModel };
