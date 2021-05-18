const express = require('express');
const cors = require('cors');
const { postgrator } = require('./lib/db');
const app = express();
const PORT = 8080;
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
			console.log(`Workify Server listening at http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.error(error));