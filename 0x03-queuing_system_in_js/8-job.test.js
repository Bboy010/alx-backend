// Importez les bibliothèques nécessaires
const chai = require('chai');
const expect = chai.expect;
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job'); // Assurez-vous d'utiliser le bon chemin

// Activez le mode de test de Kue
const queue = kue.createQueue({ disableSearch: true });
const testMode = require('kue-test-mode');
testMode.init(queue);

// Écrivez une suite de tests pour createPushNotificationsJobs
describe('createPushNotificationsJobs', () => {
  beforeEach(() => {
    // Avant chaque test, nettoyez la file d'attente
    testMode.clearQueue(queue);
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not-an-array', queue)).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue', () => {
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

    createPushNotificationsJobs(jobs, queue);

    // Vérifiez que les tâches ont été créées dans la file d'attente
    const jobCount = testMode.getQueueLength(queue);
    expect(jobCount).to.equal(jobs.length);
  });

  // Ajoutez d'autres tests au besoin
});

// Exécutez les tests avec Mocha
describe('Test Suite', () => {
  it('should run the tests', () => {
    require('./test-createPushNotificationsJobs');
  });
});
