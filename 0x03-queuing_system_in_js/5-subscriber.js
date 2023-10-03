// Import the required modules
import Redis from 'ioredis';

// Create a Redis client for the subscriber
const subscriber = new Redis();

// Attempt to connect to the Redis server
subscriber
  .on('connect', () => {
    console.log('Redis client connected to the server');
  })
  .on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
  });

// Subscribe to the "holberton school channel"
subscriber.subscribe('holberton school channel');

// Listen for incoming messages
subscriber.on('message', (channel, message) => {
  console.log(`Message received on channel "${channel}": ${message}`);
  
  // Check if the message is "KILL_SERVER"
  if (message === 'KILL_SERVER') {
    // Unsubscribe and quit
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
