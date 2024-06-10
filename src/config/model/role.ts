import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true })

const RoleModel = mongoose.model("Role", roleSchema)

export { RoleModel };
