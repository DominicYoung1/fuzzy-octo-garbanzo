import React, { useState, useReducer } from 'react';
import { Recipe, User, PageId, Action, ModelState } from './types';


const reducer = (oldstate: ModelState, action: Action): ModelState => {
    const newState = {...oldstate};
    if (action.kind === 'CLICKED_NAVBAR') {
        newState.activePage = action.payload;
        newState.editingIndex = -1;
    } 
    if (action.kind === 'ADDED_RECIPE') {
        newState.recipes = [...newState.recipes, action.payload];
    }
    if (action.kind === 'DELETED_RECIPE') {
        newState.recipes = [...newState.recipes];
        newState.recipes.splice(action.payload, 1);
    }
    if (action.kind === 'STARTED_EDITING_RECIPE') {
        newState.editingIndex = action.payload;
        newState.activePage = '#RecipeInputPage';
    }
    if (action.kind === 'FINISHED_EDITING_RECIPE') {
        newState.recipes = [...newState.recipes];
        newState.recipes[newState.editingIndex] = action.payload;
        newState.editingIndex = -1;
        newState.activePage = '#RecipeCollection';
    }
    if (action.kind === 'GOT_RECIPES') {
        newState.recipes = action.payload; 
    }
    console.log(newState);
    return newState;
}


export const useRecipeAppModel = (userProfile: User) => {
    const initalState: ModelState = {
        userProfile: userProfile,
        recipes: [],
        activePage: '#RecipeCollection',
        editingIndex: -1,
    };
    return useReducer(reducer, initalState);   
}