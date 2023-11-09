const apiKey = process.env.API_KEY;
console.log(apiKey);

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error('API key not found');
  }
  
  const url = new URL(`https://api.spoonacular.com/recipes/complexSearch`);
  const params = {
    apiKey,
    query: searchTerm,
    number: '10',
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const searchResponse = await fetch(url);
    const dataJson = await searchResponse.json();
    return dataJson;
  }
  catch (error) {
    console.error(error);
  }
}