// Importez la bibliothèque Kue
const kue = require('kue');

// Créez une file d'attente Kue
const queue = kue.createQueue();

// Fonction pour envoyer une notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Traitement des nouvelles tâches sur la file d'attente 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
  // Récupérez les données de la tâche
  const { phoneNumber, message } = job.data;
  
  // Appelez la fonction sendNotification avec les données de la tâche
  sendNotification(phoneNumber, message);

  // Indiquez que la tâche est terminée
  done();
});
