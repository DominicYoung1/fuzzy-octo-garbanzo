//const MongoClient = require('mongodb').MongoClient;
import {MongoClient} from 'mongodb';
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

// example collection of greetings!

export const addGreeting = async (greeting: string): Promise<void> => {
    const cx /* 'cx stands for connection*/ = await connectDb();
    const db /* 'db' standsd for Database*/ = cx.db("Greetings-Db");
    const greetings = db.collection("greetings");
    const existingGreetings = await greetings.findOne({value: greeting});
    if (!existingGreetings) {
        await greetings.insertOne({value: greeting});
        console.log('Inserted', greeting);
    } else {
        console.log("Greeting was already in MongoDb so I skipped uploading it again");
    }
}

export const readGreetings = async (): Promise<string[]> => {
    const cx = await connectDb();
    const db = cx.db("Greetings-Db");
    const greetings = db.collection("greetings");
    const elems = await greetings.find().toArray();
    return elems.map(elem => elem.value);
}

export const dropDuplicates = async () => {
    const cx = await connectDb();
    const db = cx.db("Greetings-Db");
    const greetings = db.collection("greetings");
    const elems = await readGreetings();
    //find all of the unique elems;
    const uE: string[] = [];
    for (let i = 0; i < elems.length; i++) {
        if (!uE.includes(elems[i])){
            uE.push(elems[i]);
        }
    }
    await greetings.deleteMany({});
    uE.forEach(elem => addGreeting(elem));
}