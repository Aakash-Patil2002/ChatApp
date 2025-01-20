const cloudinary = require('cloudinary').v2;
const config = require('dotenv').config;

// Load environment variables
config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARI_COUD_NAME,
    api_key:process.env.CLOUDINARI_API_KEY,
    api_secrete:process.env.CLOUDINARI_SECRET_KEY

})

module.export=cloudinary;