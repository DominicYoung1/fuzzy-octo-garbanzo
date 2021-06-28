export type Ingredient = {ingredient: string, amount: string};
export type Recipe = {name: string, ingredients: Ingredient[]};

export type User = {username: string, password: string};

export type PageId = '#RecipeCollection' | '#RecipeInputPage'; //more to come

export type ActionType = 'CLICKED_NAVBAR' | 'ADDED_RECIPE' | 'MODIFIED_RECIPE' | 'PINNED_RECIPE';

export type Action = {
    kind: ActionType, 
    payload: any,
};

export type ModelState = {
    userProfile: User,
    recipes: Recipe[],
    editingIndex: number | undefined,
    activePage: PageId,
}