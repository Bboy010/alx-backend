// Import the required modules
import Redis from 'ioredis';

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

// Create a Hash in Redis
function createHash() {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

// Display the Hash in Redis
function displayHash() {
  client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      console.error(`Error getting the hash from Redis: ${err.message}`);
    } else {
      console.log(result);
    }
    client.quit(); // Close the Redis connection
  });
}

// Call the functions
createHash();
displayHash();
