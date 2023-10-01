const Redis = require('ioredis');
const redis = new Redis();

function setNewSchool(schoolName, value) {
  redis.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error('Error setting value:', err);
    } else {
      console.log(`Redis client connected to the server`);
      console.log(`Key '${schoolName}' set to '${value}'`);
      redis.print('Reply:', reply);
    }
  });
}

function displaySchoolValue(schoolName) {
  redis.get(schoolName, (err, value) => {
    if (err) {
      console.error('Error getting value:', err);
    } else if (value === null) {
      console.log(`Key '${schoolName}' does not exist`);
    } else {
      console.log(`Value for key '${schoolName}': ${value}`);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
