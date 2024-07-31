import redis from "redis";

const redisClient = redis.createClient();

// Event handler for successful connection
redisClient.on("connect", () => {
  console.log("Redis client connected to the server");
});

// Event handler for connection errors
redisClient.on("error", (error) => {
  console.log(`Redis client not connected to the server: ${error.toString()}`);
});

// Create a hash with key "HolbertonSchools" and values for each city
redisClient.hset("HolbertonSchools", "Portland", 50, redis.print);
redisClient.hset("HolbertonSchools", "Seattle", 80, redis.print);
redisClient.hset("HolbertonSchools", "New York", 20, redis.print);
redisClient.hset("HolbertonSchools", "Bogota", 20, redis.print);
redisClient.hset("HolbertonSchools", "Cali", 40, redis.print);
redisClient.hset("HolbertonSchools", "Paris", 2, redis.print);

// Retrieve and display the hash using hgetall
redisClient.hgetall("HolbertonSchools", (error, response) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log(response);
  }
});
