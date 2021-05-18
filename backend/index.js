const path = require('path');
const result = require('dotenv').config({
	path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)
});

if (result.error) {
	throw new Error(result.error);
}
const express = require('express');
const cors = require('cors');
const { postgrator } = require('./lib/db');
const app = express();
const PORT = +process.env.PORT;
app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));
app.use('/users', require('./routes/users'));
app.use('/jobs', require('./routes/jobs'));
app.get('/', (req, res) => {
	res.send('Hello World!');
});

postgrator
	.migrate()
	.then((result) => {
		console.log(`migrated db successfully:`, result);
		app.listen(PORT, () => {
			console.log(`Workify Server listening at port : ${PORT}`);
		});
	})
	.catch((error) => console.error(error));
