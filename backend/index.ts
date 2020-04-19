const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('yo'));

app.listen(port, () => console.log(`Backend is listening on port ${port}`));
