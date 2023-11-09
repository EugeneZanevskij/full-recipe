import {Recipe} from "../types";

interface Props {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({recipe, onClick}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="" />
      <h2>{recipe.title}</h2>
    </div>
  )
}

export default RecipeCard;