import express from 'express';
const app = express();
const port = 3000;

app.get('/api/v1/hello', (req, res) => {
    res.send('Hello Backend!');
});

app.post('/api/v1/data', (req, res) => {
    res.json({ message: 'Data received' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});