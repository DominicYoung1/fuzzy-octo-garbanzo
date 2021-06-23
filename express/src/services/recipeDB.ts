import {MongoClient} from 'mongodb';
import {Ingredient, Recipe, User} from '../types';
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

export const createUser = async (username: string, password: string): Promise<User> => {
    const cx = await connectDb();
    const db = cx.db("Recipe-App");
    const users = db.collection("Users");
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
        return user;
    } else {
        console.log('User already exists!!');
        return existingUser;
    }

}

