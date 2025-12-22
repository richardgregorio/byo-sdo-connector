const express = require('express');
const app = express();
const PORT = 3031;

app.use(express.json());

app.post('/api/sendmessage', (req, res) => {
  console.log('Request body: ', req.body);
  res.json({message: 'Server is Working!'});
});

app.use((req,res) => {
  res.status(404).send('Route not found');
});
app.listen(PORT, () => {
  console.log(`Test server listening at http://localhost:${PORT}`);
});