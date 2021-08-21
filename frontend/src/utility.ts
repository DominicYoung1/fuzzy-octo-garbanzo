import React from 'react';
import {Action, Recipe} from './types';

export const getRecipes = async (user: string, dispatch: React.Dispatch<Action>) => {
    const response = await fetch("http://localhost:8888/recipes?user="+user, {
        method: 'GET',
      });
      if (response.status === 200) {
          const body = await response.json();
          const recipes = body.data as Recipe[];
          dispatch({
              kind: 'GOT_RECIPES',
              payload: recipes,
          });
      } else {
          console.log('Could not get recipes');
      }
}