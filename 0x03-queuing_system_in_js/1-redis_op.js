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

// Function to set a new school name and its value in Redis
function setNewSchoolValue(schoolName, value) {
  redisClient.set(schoolName, value);
}

// Function to display the value associated with a school name in Redis
function displaySchoolValue(schoolName) {
  redisClient.get(schoolName, (err, response) => {
    console.log(response);
  });
}

// Example usage of the functions
displaySchoolValue('Holberton');
setNewSchoolValue('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
