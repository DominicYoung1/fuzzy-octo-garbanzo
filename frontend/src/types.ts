export type Ingredient = {ingredient: string, amount: string};
export type Recipe = {name: string, ingredients: Ingredient[], id: string};
export type RecipePayload = {recipe: Recipe, user: User,};

export type User = string;

export type PageId = '#RecipeCollection' | '#RecipeInputPage'; //more to come

export type ActionType = 'CLICKED_NAVBAR' |
    'ADDED_RECIPE' |
    'STARTED_EDITING_RECIPE' |
    'FINISHED_EDITING_RECIPE' |
    'PINNED_RECIPE'|
    'DELETED_RECIPE'|
    'GOT_RECIPES';

export type Action = {
    kind: ActionType, 
    payload: any,
};

export type ModelState = {
    userProfile: User,
    recipes: Recipe[],
    activePage: PageId,
    editingIndex: number, // if editing index === -1 we are not editing
    // otherwise it is the index in the recipes array of the recipe that we
    // want to edit.
}