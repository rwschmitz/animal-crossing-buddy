import express from 'express';

const app = express();
const port = 3001;

app.get('/', (_, res) => res.send('blinded by the lights'));

app.listen(port, () => console.log(`Backend is listening on port ${port}`));
