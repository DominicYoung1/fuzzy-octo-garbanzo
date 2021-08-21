export type Ingredient = {
    name: string,
    amount: string
};
    
export type RecipeRecord = {
    name: string, 
    ingredients: 
    Ingredient[], 
    owner: string, //this should be the id of the user that owns this recipe.
    viewers: string[],
    steps: string,
    id: string
};

export type User = {
    username: string, 
    password: string, 
    ID: string
};

export type Recipe = {name: string, ingredients: Ingredient[], id: string};

export type RecipePayload = {recipe: Recipe, user: string};
