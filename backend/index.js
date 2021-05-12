const express = require('express');
const cors = require('cors');
const { postgrator } = require('./lib/db');
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
	res.send('Hello World!');
});

postgrator
	.migrate()
	.then((result) => {
		console.log(`migrated db successfully:`, result);
		app.listen(PORT, () => {
			console.log(`Pett Server listening at http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.error(error));
