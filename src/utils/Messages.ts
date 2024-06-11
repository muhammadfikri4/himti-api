export const MESSAGES = {
    CREATED: {
        USER: {
            ACCOUNT: "User created successfully"
        },
        ROLE: "Role created successfully",
        ANGKATAN: "Angkatan created successfully",
        DOSEN: "Dosen created successfully",
        STRUKTURAL: "Struktural created successfully"
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
            STRUKTURAL: "Struktural not found"
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
            DOSEN: "Dosen is already exist"
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
            ID: "ID is invalid"
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first"
        },
        REQUIRED: {
            EMAIL: "Email is required",
            PASSWORD: "Password is required",
            NAME: "Name is required",
            ROLE_NAME: "Role Name is required",
            ANGKATAN_NAME: "Angkatan Name is required",
            NIDN: "NIDN is required",
            NIM: "NIM is required",
            ANGKATAN_ID: "Angkatan Id is required"
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
        }
    }
}