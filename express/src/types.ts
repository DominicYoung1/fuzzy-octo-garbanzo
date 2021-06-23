export type Ingredient = {
    name: string,
    amount: string
};
    
export type Recipe = {
    name: string, 
    ingredients: 
    Ingredient[], 
    owner: string, //this should be the id of the user that owns this recipe.
    viewers: string[]
};

export type User = {
    username: string, 
    password: string, 
    ID: string
};

