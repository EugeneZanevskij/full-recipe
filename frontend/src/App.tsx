import {useRef, useState} from 'react';
import "./App.css";
import * as api from "./api";
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await api.searchRecipes(searchTerm, 1);
      console.log(result);
      setRecipes(result);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  }

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder='Search'/>
        <button type="submit">Search</button>
      </form>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
      ))}
      <button className='load-more' onClick={handleViewMore}>Load More</button>
      {selectedRecipe && <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} />}
    </div>
  )
}

export default App