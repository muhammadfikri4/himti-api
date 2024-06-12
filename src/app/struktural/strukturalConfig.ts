import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ENV } from '../../libs';

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
});
// cloud_name: 'dgciwba8m',
// api_key: "872533227445899",
// api_secret: "X5qKOS7MnFHDsfNs3jmMKl9wCw8"

// Konfigurasi Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        public_id: () => `struktural/${+new Date()}`,
    },
});

const upload = multer({ storage });
export { upload };
