import {useRef, useState, useEffect} from 'react';
import "./App.css";
import foodImage from './assets/foodImage.jpg';
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

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.error(error);
    }
  }

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      setFavouriteRecipes(favouriteRecipes.filter((favouriteRecipe) => favouriteRecipe.id !== recipe.id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <img className="header__image" src={foodImage} alt="logo"/>
        <h1 className="header__title">Recipe app</h1>
      </header>
      <div className="tabs">
        <h1 className={selectedTab === 'search' ? 'tab--active' : ''} onClick={()=> setSelectedTab("search")}>Recipe Search</h1>
        <h1 className={selectedTab === 'favourites' ? 'tab--active' : ''} onClick={()=> setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === 'search' && (
        <>
        <form className="search-form" onSubmit={(e) => handleSearchSubmit(e)}>
          <input 
            className="search-input"
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder='Search'/>
          <button className="search-btn" type="submit">Search</button>
        </form>
        {recipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some((favouriteRecipe) => recipe.id === favouriteRecipe.id);
          return (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} onFavourite={isFavourite ? removeFavouriteRecipe : addFavouriteRecipe} isFavourite={isFavourite}/>
          );
        }
        )}
        <button className='load-more' onClick={handleViewMore}>Load More</button>
        </>
      )}
      {selectedTab === 'favourites' && (
        <div>
          {favouriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} onFavourite={removeFavouriteRecipe} isFavourite={true}/>
          ))}
        </div>
      )}
      {selectedRecipe && <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} />}
    </div>
  )
}

export default App