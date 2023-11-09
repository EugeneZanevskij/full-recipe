import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import * as RecipeAPI from './recipe-api';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/recipes/search', async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string) || 1;
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});

app.get('/api/recipes/:recipeId/summary', async (req, res) => {
  const recipeId = req.params.recipeId;
  const result = await RecipeAPI.getRecipeSummary(recipeId);
  return res.json(result);
})

app.listen(5000, () => {
  console.log('Server started on port 5000');
});