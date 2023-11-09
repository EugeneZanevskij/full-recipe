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