import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

import * as RecipeAPI from './recipe-api';

const app = express();
const prismaClient = new PrismaClient();

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

app.post('/api/recipes/favourite', async (req, res) => {
  const recipeId = req.body.recipeId;
  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.create({
      data: {
        recipeId
      }
    });
    return res.status(201).json(favouriteRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add favourite recipe' });
  }
})

app.get('/api/recipes/favourite', async (req, res) => {
  try {
    const recipes = await prismaClient.favouriteRecipes.findMany();
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());
    const results = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds);
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get favourite recipes' });
  }
})

app.delete('/api/recipes/favourite', async (req, res) => {
  const recipeId = req.body.recipeId;
  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.delete({
      where: {
        recipeId
      }
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to remove favourite recipe' });
  }
})

app.listen(5000, () => {
  console.log('Server started on port 5000');
});