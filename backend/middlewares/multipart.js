const multer = require('multer');

const upload = (folder) => {
	const storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, './public/' + folder);
		},
		filename: function(req, file, cb) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, uniqueSuffix + '-' + file.originalname);
		}
	});
	return multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
};
exports.upload = upload;
