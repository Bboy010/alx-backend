// Import the required modules
import Redis from 'ioredis';

// Create a Redis client for the publisher
const publisher = new Redis();

// Attempt to connect to the Redis server
publisher
  .on('connect', () => {
    console.log('Redis client connected to the server');
  })
  .on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
  });

// Function to publish a message after a specified time
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send MESSAGE: ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

// Call the publishMessage function
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
