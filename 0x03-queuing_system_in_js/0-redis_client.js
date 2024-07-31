import redis from 'redis';

// Create a Redis client
const redisClient = redis.createClient();

// Handle Redis client connection events
redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

redisClient.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});
