import { MongoMemoryServer } from 'mongodb-memory-server';

export async function startMemoryDB(): Promise<string> {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log('MongoDB Memory URI:', uri);
  return uri;
}
