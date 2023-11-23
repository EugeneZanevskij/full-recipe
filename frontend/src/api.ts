import { Recipe } from "./types";

export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL('http://localhost:5000/api/recipes/search');
  baseUrl.searchParams.append('searchTerm', searchTerm);
  baseUrl.searchParams.append('page', page.toString());

  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export const getRecipeSummary = async (recipeId: string) => {
  const baseUrl = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getFavouriteRecipes = async () => {
  const baseUrl = new URL('http://localhost:5000/api/recipes/favourite');
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export const addFavouriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL('http://localhost:5000/api/recipes/favourite');
  const body = {
    recipeId: recipe.id
  }
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error('Failed to add favourite recipe');
  }
}