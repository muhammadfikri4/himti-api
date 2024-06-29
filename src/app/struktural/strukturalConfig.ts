// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { ENV } from '../../libs';

// cloudinary.config({
//     cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
//     api_key: ENV.CLOUDINARY_API_KEY,
//     api_secret: ENV.CLOUDINARY_API_SECRET
// });

// // Konfigurasi Multer-Cloudinary Storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         public_id: () => `struktural/${+new Date()}`,
//     },
// });

// const upload = multer({ storage });
// export { upload };
