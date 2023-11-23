import {Recipe} from "../types";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  onFavourite: (recipe: Recipe) => void;
  isFavourite: boolean;
}

const RecipeCard = ({recipe, onClick, onFavourite, isFavourite}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="" />
      <div className="recipe-card__title">
        <span onClick={(event) => {
          event.stopPropagation();
          onFavourite(recipe)
        }}>
          {isFavourite ? <AiFillHeart size={25} color="red"/> : <AiOutlineHeart size={25} />}
        </span>
        <h2>{recipe.title}</h2>
      </div>
    </div>
  )
}

export default RecipeCard;