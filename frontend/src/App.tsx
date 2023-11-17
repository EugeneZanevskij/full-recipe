import {useRef, useState, useEffect} from 'react';
import "./App.css";
import * as api from "./api";
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';

type Tabs = 'search' | 'favourites';
const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tabs>('search');
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await api.getFavouriteRecipes();
        console.log(favoriteRecipes);
        setFavouriteRecipes(favoriteRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

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
      <div className="tabs">
        <h1 onClick={()=> setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={()=> setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === 'search' && (
        <>
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
        </>
      )}
      {selectedTab === 'favourites' && (
        <div>
          {favouriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
          ))}
        </div>
      )}
      {selectedRecipe && <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} />}
    </div>
  )
}

export default App