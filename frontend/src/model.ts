import React, { useState, useReducer } from 'react';
import { Recipe, User, PageId, Action, ModelState } from './types';


const reducer = (oldstate: ModelState, action: Action): ModelState => {
    const newState = {...oldstate};
    if (action.kind === 'CLICKED_NAVBAR') {
        newState.activePage = action.payload;
    } 
    if (action.kind === 'ADDED_RECIPE') {
        newState.recipes = [...newState.recipes, action.payload];
    }
    if (action.kind === 'DELETED RECIPE') {
        newState.recipes = [...newState.recipes];
        newState.recipes.splice(action.payload, 1);
    }
    console.log(newState);
    return newState;
}


export const useRecipeAppModel = (userProfile: User) => {
    const initalState: ModelState = {
        userProfile: userProfile,
        recipes: [],
        activePage: '#RecipeCollection',
    };
    return useReducer(reducer, initalState);   
}