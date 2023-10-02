// Import the required modules
import Redis from 'ioredis';
import { promisify } from 'util';

// Create a Redis client
const client = new Redis();

// Attempt to connect to the Redis server
client
  .on('connect', () => {
    console.log('Redis client connected to the server');
  })
  .on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
  });

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error(`Error setting ${schoolName} in Redis: ${err.message}`);
    } else {
      console.log(`${schoolName} set in Redis with value ${value}`);
      client.quit(); // Close the Redis connection
    }
  });
}

// Function to display the value of a school in Redis using async/await and promisify
const displaySchoolValue = async (schoolName) => {
  const getAsync = promisify(client.get).bind(client);

  try {
    const value = await getAsync(schoolName);
    if (value === null) {
      console.log(`${schoolName}: Key not found in Redis`);
    } else {
      console.log(`${schoolName}: ${value}`);
    }
  } catch (err) {
    console.error(`Error getting ${schoolName} from Redis: ${err.message}`);
  } finally {
    client.quit(); // Close the Redis connection
  }
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
