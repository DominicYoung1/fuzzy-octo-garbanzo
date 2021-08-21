import {MongoClient} from 'mongodb';
import {Ingredient, RecipeRecord, User, RecipePayload, Recipe} from '../types';
import {v4 as getUuid} from 'uuid';
const uri = "mongodb+srv://Admin:Nachos007@cluster0.1vsgl.mongodb.net/recipe-app?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// This function will be responsible for connecting to mongoDb Atlas

export const connectDb = async (): Promise<MongoClient> => {
    if (client.isConnected()) {
        return client;
    }
    client = await client.connect();
    console.log('I connected!')
    return client;
}

export const createUser = async (username: string, password: string): Promise<string> => {
    const cx = await connectDb();
    const db = cx.db("RecipeDb");
    const users = db.collection("UserPool");
    const existingUser = await users.findOne({username: username, password: password});
    if (!existingUser) {
        const iD = getUuid()
        const user = {
            username: username,
            password: password,
            ID: iD
        };
        await users.insertOne(user);
        console.log('Inserted', user);
        return iD;
    } else {
        return "INVALID";
    }

}

export const loginUser = async (username: string, password: string): Promise<string> => {
    const cx = await connectDb();
    const db = cx.db("RecipeDb");
    const users = db.collection("UserPool");
    const existingUser = await users.findOne({username: username, password: password});
    if (!existingUser) {
        return "INVALID";
    } else return existingUser.ID;
}

export const addRecipe = async (payload: RecipePayload): Promise<RecipeRecord | null> => {
    const cx = await connectDb();
    const db = cx.db("RecipeDb");
    const recipes = db.collection("RecipePool");
    const recipeRecord: RecipeRecord = {
        name: payload.recipe.name,
        ingredients: payload.recipe.ingredients,
        owner: payload.user,
        viewers: [],
        steps: '',
        id: getUuid()
    };
    const newRecipe = await recipes.findOne({name: recipeRecord.name});
    if (newRecipe) {
        return null;
    } else {
        await recipes.insertOne(recipeRecord);
        console.log('Inserted', recipeRecord);
        return recipeRecord;
    }
}

export const getRecipes = async (userId: string): Promise<RecipeRecord[]> => {
    const cx = await connectDb();
    const db = cx.db("RecipeDb");
    const recipes = db.collection("RecipePool");
    const records = await recipes.find({
        owner:userId
    }).toArray();
    return records as RecipeRecord[];
}
