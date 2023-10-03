// Importez la bibliothèque Kue
const kue = require('kue');

// Créez une file d'attente Kue
const queue = kue.createQueue();

// Fonction pour créer des tâches de notification
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const notificationJob = queue.create('push_notification_code_3', jobData);

    // Événements de gestion de la tâche
    notificationJob
      .on('complete', () => {
        console.log(`Notification job ${notificationJob.id} completed`);
      })
      .on('failed', (err) => {
        console.error(`Notification job ${notificationJob.id} failed: ${err}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
      });

    // Sauvegardez la tâche dans la file d'attente
    notificationJob.save((err) => {
      if (err) {
        console.error(`Error creating notification job: ${err}`);
      } else {
        console.log(`Notification job created: ${notificationJob.id}`);
      }
    });
  });
}

// Exemple d'utilisation
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  // ... Ajoutez d'autres objets de tâche ici
];

try {
  createPushNotificationsJobs(jobs, queue);
} catch (error) {
  console.error(error.message);
}
