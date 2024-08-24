import { Schema } from "redis-om";

export const anggotaSchema = new Schema('anggota', {
    name: {
        type: 'string',


    },
    email: { type: 'string' },
    nim: { type: 'number' },
    angkatanId: { type: 'string' },
    instagram: { type: 'string' },
    facebook: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    isActive: { type: 'boolean' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' }
})