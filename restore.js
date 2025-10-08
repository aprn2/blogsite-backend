import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

let client = new MongoClient('mongodb://localhost:27017/blog');

try {
    await client.connect();
    const db = client.db('blog');
    const userCollection = db.collection('users');
    const fileContent = await fs.readFile(process.env.RESTORE_USERS_FILE, 'utf-8');
    const data = JSON.parse(fileContent);
    await userCollection.insertMany(data);
}catch(e) {
    console.error(e)
}finally {
    await client.close();
}
