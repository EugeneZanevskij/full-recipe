import {useState} from 'react';
import "./App.css";
import * as api from "./api";
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await api.searchRecipes(searchTerm, 1);
      console.log(result);
      setRecipes(result);
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
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default App