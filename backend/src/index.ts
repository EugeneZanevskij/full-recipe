import express from 'express';
import cors from 'cors';
import exp from 'constants';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/recipes/search', async (req, res) => {
  res.json({ message: "Success" });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});