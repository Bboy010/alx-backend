// Importez la bibliothèque Kue
const kue = require('kue');

// Créez une file d'attente Kue
const queue = kue.createQueue();

// Numéros de téléphone en liste noire
const blacklistedNumbers = ['4153518780', '4153518781'];

// Fonction pour envoyer une notification
function sendNotification(phoneNumber, message, job, done) {
  // Suivi de la progression du travail
  job.progress(0, 100);

  // Vérifiez si le numéro de téléphone est en liste noire
  if (blacklistedNumbers.includes(phoneNumber)) {
    const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
    console.error(errorMessage);
    done(new Error(errorMessage));
  } else {
    // Suivi de la progression à 50%
    job.progress(50, 100);

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}

// Traitement des tâches sur la file d'attente 'push_notification_code_2' avec deux tâches à la fois
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
