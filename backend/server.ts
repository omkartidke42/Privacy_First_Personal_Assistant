import express from 'express';

const PORT = 3000;

const app = express();

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
