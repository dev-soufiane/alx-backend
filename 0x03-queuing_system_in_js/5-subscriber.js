import redis from "redis";

// Create a Redis client
const redisClient = redis.createClient();

// Event handler for successful connection
redisClient.on("connect", () => {
  console.log("Redis client connected to the server");
});

// Event handler for connection errors
redisClient.on("error", (error) => {
  console.log(`Redis client not connected to the server: ${error.toString()}`);
});

// Subscribe to the "holberton school channel"
redisClient.subscribe("holberton school channel");

// Event handler for receiving messages on the subscribed channel
redisClient.on("message", (channel, message) => {
  console.log(message);

  // Check if the received message is "KILL_SERVER"
  if (message === "KILL_SERVER") {
    // Unsubscribe from the channel and quit the Redis client
    redisClient.unsubscribe();
    redisClient.quit();
  }
});
