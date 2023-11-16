import React, { useEffect, useState } from 'react';
import { RecipeSummary } from '../types';
import * as RecipeAPI from '../api';

interface Props {
  recipeId: string;
  onClose: () => void;
}
const RecipeModal = ({recipeId, onClose}: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const response = await RecipeAPI.getRecipeSummary(recipeId);
        setRecipeSummary(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipeSummary();
  }, [recipeId]);
  if(!recipeSummary) return <></>;
  return (
    <>
      <div className='overlay' onClick={onClose}></div>
      <div className='modal'>
        <div className='modal-header'>
          <h2>{recipeSummary.title}</h2>
          <span className="close-btn" onClick={onClose}>&times;</span>
        </div>
        <p dangerouslySetInnerHTML={{__html: recipeSummary?.summary}}></p>
      </div>
    </>
  )
}

export default RecipeModal