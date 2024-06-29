export const MESSAGES = {
    CREATED: {
        USER: {
            ACCOUNT: "User created successfully"
        },
        ROLE: "Role created successfully",
        ANGKATAN: "Angkatan created successfully",
        DOSEN: "Dosen created successfully",
        STRUKTURAL: "Struktural created successfully",
        ANGGOTA: "Anggota created successfully",
        ALUMNI: "Alumni created successfully",
        ACARA: "Acara created successfully",
    },
    ERROR: {
        NOT_FOUND: {
            USER: {
                ACCOUNT: "User not found",

            },
            ANGKATAN: {
                ID: "Angkatan ID not found",
                NAME: "Angkatan not found"
            },
            ROLE: "Role not found",
            DOSEN: "Dosen not found",
            STRUKTURAL: "Struktural not found",
            ANGGOTA: "Anggota not found",
            ALUMNI: "Alumni not found",
            ACARA: "Acara not found"
        },
        ALREADY: {
            GLOBAL: {
                EMAIL: "Email is already exist",
                NIDN: "NIDN is already exist",
                NIM: "NIM is already exist"
            },
            USER: "User already exist",
            ROLE: "Role is already exist",
            ANGKATAN: "Angkatan is already exist",
            DOSEN: "Dosen is already exist",
            STRUKTURAL: "Struktural is already exist",
            ANGGOTA: "Anggota is already exist",
            ALUMNI: "Alumni is already exist"
        },
        INVALID: {
            GLOBAL: {
                EMAIL: "Email is invalid"
            },
            USER: {
                PASSWORD: "Password is wrong",
                PASSWORD_LENGTH: "Password must be at least 8 characters",

            },
            ANGKATAN: "Angkatan must be a number",
            ID: "ID is invalid",
            NIM: "NIM must be a number",
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first"
        },
        REQUIRED: {
            EMAIL: "Email is required",
            PASSWORD: "Password is required",
            NAME: "Name is required",
            ROLE_NAME: "Role Name is required",
            ANGKATAN_YEAR: "Angkatan year is required",
            NIDN: "NIDN is required",
            NIM: "NIM is required",
            ANGKATAN_ID: "Angkatan Id is required",
            IMAGE: "Image is required",
            JABATAN: "Jabatan is required",
            ANGGOTA_ID: "Anggota Id is required",
            COMPANY: "Company is required",
            START_DATE: "First Date is required when acara is open",
            END_DATE: "End Date is required when acara is open",
        },
        RELATION: {
            ANGKATAN: "Angkatan cannot be deleted because it has a relationship"
        }
    },
    SUCCESS: {
        USER: "User logged in successfully",
        ANGKATAN: {
            GET: "Success to fetch angkatan",
            DELETE: "Success to delete angkatan",
            UPDATE: "Success to update angkatan"
        },
        DOSEN: {
            GET: "Success to fetch dosen",
            DELETE: "Success to delete dosen",
            UPDATE: "Success to update dosen"
        },
        STRUKTURAL: {
            GET: "Success to fetch Struktural",
            DELETE: "Success to delete Struktural",
            UPDATE: "Success to update Struktural"
        },
        ANGGOTA: {
            GET: "Success to fetch Anggota",
            DELETE: "Success to delete Anggota",
            UPDATE: "Success to update Anggota"
        },
        ALUMNI: {
            GET: "Success to fetch Alumni",
            DELETE: "Success to delete Alumni",
            UPDATE: "Success to update Alumni"
        },
        ACARA: {
            GET: "Success to fetch Acara",
            DELETE: "Success to delete Acara",
            UPDATE: "Success to update Acara"
        }
    }
}