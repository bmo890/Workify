const parseBody = (fieldName) => {
	return (req, res, next) => {
		try {
			const parsedField = JSON.parse(req.body[fieldName]);
			req.body[fieldName] = parsedField;
			next();
		} catch (err) {
			res.status(400);
			res.send({ message: `value of field: ${fieldName} is not a valid JSON` });
		}
	};
};
module.exports = parseBody;
