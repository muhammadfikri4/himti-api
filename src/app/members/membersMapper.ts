import { Member, Generation } from "@prisma/client";

export interface MemberData extends Member {
    Generation:Generation
}

export const memberMapper = (members: MemberData[]) => {
    const mapper = members.map((member: MemberData) => {
        const { id, createdAt, updatedAt, email, name, nim, facebook, instagram, linkedin, twitter, isActive } = member
        const sosmed = { facebook, instagram, linkedin, twitter }
        // const now = new Date().getFullYear()
        return {
            id,
            nim,
            name,
            email,
            generation: {
                id: member.Generation.id,
                year: member.Generation.year
            },
            ...sosmed,
            isActive,
            createdAt,
            updatedAt

        }
    })
    return mapper
}