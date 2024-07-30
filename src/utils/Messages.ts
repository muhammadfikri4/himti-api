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
        SUB_ACARA: "Sub Acara created successfully",
        ABSENSI: "Absensi created successfully",
        MERCHANDISE: "Merchandise created successfully"
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
            ACARA: "Acara not found",
            SUB_ACARA: "Sub Acara not found",
            USER_ID: "User ID not found",
            ABSENSI: "Absensi not found",
            MERCHANDISE: "Merchandise not found",
            SERVICE: "Service not found",
            ROUTE: "Route not found, Check again your endpoint!",

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
            ALUMNI: "Alumni is already exist",
            ANGGOTA_STRUKTURAL: "Anggota cannot join more than 1 struktural",
            JABATAN: "Jabatan is already exists in the struktural",
            USER_NIM: "User cannot use anggota NIM",
            MERCHANDISE: "Merchandise is already exist"
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
            NIM: {
                FORMAT: "NIM must be a number",
                LENGTH: "NIM cannot be more than 14 characters"
            },
            AUTH: "Invalid credentials token",
            ANGGOTA: "You're not anggota",
            STATUS: "Status must be boolean type",
            NAME: "Name must be a string",
            JABATAN: "Jabatan is invalid",
            NEW_PASSWORD: "New password cannot be the same as the old password",
            NIM_ANGGOTA: "Anggota cannot change their NIM",
            CODE_ANGGOTA: "Code is invalid",
            IMAGE_SIZE: "Image size must be less than 5mb",
            ROLE_ADMIN: "You're not admin",
            CODE_USER: "User is not allowed to use Code",
            FILE_TYPE: "Invalid Image Type",
            OTP_ID: "Invalid OTP ID",
            OTP_NUMBER: "OTP is invalid, check your email to get a valid OTP",
            OTP_VERIFIED: "Your otp has not been verified",
            OTP_EXPIRED: "OTP has been expired",
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first",
            FORBIDDEN: "You are not Authorized",
            EXPIRED: "Token Expired, please log in again",
            RECOGNIZED: "Token not recognized"
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
            ACARA: "Acara must be select",
            COORDINATE: "Coordinate is required",
            OLD_PASSWORD: "Old Password is required",
            NEW_PASSWORD: "New Password is required",
            CODE_ANGGOTA: "Cannot use NIM anggota without referal code",
            TITLE: "Title is required",
            DESCRIPTION: "Description is required",
            PRICE: "Price is required",
            ACARA_ID: "Acara Id is required",
            SUB_ACARA_ID: "Sub Acara Id is required",
            OTP_ID: "OTP ID is required",
            OTP: "OTP is required",
        },
        RELATION: {
            ANGKATAN: "Angkatan cannot be deleted because it has a relationship"
        },
        SERVER_ERROR: {
            INTERNAL_SERVER_ERROR: "Internal server error"
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
        },
        SUB_ACARA: {
            GET: "Success to fetch Sub Acara",
            DELETE: "Success to delete Sub Acara",
            UPDATE: "Success to update Sub Acara"
        },
        PROFILE: {
            GET: "Success to fetch profile",
            UPDATE: "Success to update profile"
        },
        ABSENSI: {
            GET: "Success to fetch Absensi",
            DELETE: "Success to delete Absensi",
            UPDATE: "Success to update Absensi"
        },
        MERCHANDISE: {
            GET: "Success to fetch Merchandise",
            DELETE: "Success to delete Merchandise",
            UPDATE: "Success to update Merchandise"
        },
        SERVICE: {
            GET: "Success to fetch Service",
            DELETE: "Success to delete Service",
            UPDATE: "Success to update Service"
        },
        USER_DATA: {
            GET: "Success to fetch user data",
            UPDATE: "Success to update user data",
            DELETE: "Success to delete user data"
        },
        OTP: {
            SEND: "Success to send otp",
            VERIFY: "Success to verify otp",
            RESEND: "Success to resend otp"
        }
    }
}