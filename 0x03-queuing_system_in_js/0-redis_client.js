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
