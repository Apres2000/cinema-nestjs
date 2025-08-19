const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 12345,
      dbName: 'movie-api',
    },
  });

  console.log(`MongoDB started at: ${mongod.getUri()}`);
})();
