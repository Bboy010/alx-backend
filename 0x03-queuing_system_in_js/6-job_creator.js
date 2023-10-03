// Importez la bibliothèque Kue
const kue = require('kue');

// Créez une file d'attente Kue
const queue = kue.createQueue();

// Données de la tâche
const jobData = {
  phoneNumber: '1234567890',
  message: 'Ceci est un message de notification.',
};

// Créez une tâche dans la file d'attente
const notificationJob = queue.create('push_notification_code', jobData);

// Événements de gestion de la tâche
notificationJob
  .on('complete', () => {
    console.log('Notification job completed');
    process.exit(0); // Quittez le script après la fin de la tâche
  })
  .on('failed', () => {
    console.error('Notification job failed');
    process.exit(1); // Quittez le script avec une erreur en cas d'échec de la tâche
  })
  .on('enqueue', () => {
    console.log(`Notification job created: ${notificationJob.id}`);
  });

// Sauvegardez la tâche dans la file d'attente
notificationJob.save((err) => {
  if (err) {
    console.error(`Error creating notification job: ${err}`);
    process.exit(1); // Quittez le script avec une erreur en cas d'erreur lors de la création de la tâche
  }
});
