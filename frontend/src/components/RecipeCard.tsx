import {Recipe} from "../types";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({recipe}: Props) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt="" />
      <h2>{recipe.title}</h2>
    </div>
  )
}

export default RecipeCard;