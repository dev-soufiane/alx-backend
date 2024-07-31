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

// Function to publish a message after a specified time
function publishMessage(message, time) {
  setTimeout(() => {
    console.log("About to send", message);
    // Publish the message to the "holberton school channel"
    redisClient.publish("holberton school channel", message);
  }, time);
}

// Schedule messages to be published after specified time intervals
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);

