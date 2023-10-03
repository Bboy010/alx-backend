const express = require('express');
const Redis = require('ioredis');
const { promisify } = require('util');
const kue = require('kue');

const app = express();
const redisClient = new Redis();
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);

// Fonction pour réserver un siège
async function reserveSeat(number) {
  await redisSet('available_seats', number);
}

// Fonction pour obtenir le nombre actuel de sièges disponibles
async function getCurrentAvailableSeats() {
  const result = await redisGet('available_seats');
  return result ? parseInt(result) : 0;
}

// Au lancement de l'application, définissez le nombre de sièges disponibles à 50
reserveSeat(50);

// Initialisez la variable reservationEnabled à true
let reservationEnabled = true;

// Créez une file d'attente Kue
const queue = kue.createQueue();

// Route pour obtenir le nombre de sièges disponibles
app.get('/available_seats', (req, res) => {
  res.json({ numberOfAvailableSeats: String(await getCurrentAvailableSeats()) });
});

// Route pour réserver un siège
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat', {});

  job.save(async (err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });
});

// Route pour traiter la file d'attente
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentAvailableSeats = await getCurrentAvailableSeats();

    if (currentAvailableSeats === 0) {
      reservationEnabled = false;
      done(new Error('Not enough seats available'));
    } else if (currentAvailableSeats >= 0) {
      await reserveSeat(currentAvailableSeats - 1);
      if (currentAvailableSeats - 1 === 0) {
        reservationEnabled = false;
      }
      done();
    }
  });
});

// Démarrer le serveur Express
const port = 1245;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
