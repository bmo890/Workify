const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dinrt1sb0',
	api_key: '685212152164525',
	api_secret: 'mc0Fe_U__5TBic_IxD0PWElNPSs'
});
function uploadToCloud(filePath) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(filePath, (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
}
exports.uploadToCloud = uploadToCloud;
