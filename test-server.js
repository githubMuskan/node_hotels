import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 8000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Server address:`, server.address());
});