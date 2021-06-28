import React, { useState, useReducer } from 'react';
import { Recipe, User, PageId, Action, ModelState } from './types';


const reducer = (oldstate: ModelState, action: Action): ModelState => {
    const newState = {...oldstate};
    if (action.kind === 'CLICKED_NAVBAR') {
        newState.activePage = action.payload;
    }
    return newState;
}


export const useRecipeAppModel = (userProfile: User) => {
    const initalState: ModelState = {
        userProfile: userProfile,
        recipes: [],
        editingIndex: undefined,
        activePage: '#RecipeCollection',
    };
    return useReducer(reducer, initalState);   
}