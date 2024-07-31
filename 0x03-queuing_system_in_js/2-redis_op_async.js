import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);

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
  redisClient.set(schoolName, value, redis.print);
}

// Asynchronously display the value associated with a school name
async function displaySchoolValue(schoolName) {
  const value = await getAsync(schoolName);
  console.log(value);
}

// Example usage of the functions
displaySchoolValue('Holberton');
setNewSchoolValue('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

