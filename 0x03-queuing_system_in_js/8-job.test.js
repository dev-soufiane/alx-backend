import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Create a queue in test mode
    queue = kue.createQueue({ testMode: true });
  });

  after(() => {
    // Clear the queue and exit test mode
    queue.clear();
    queue.testMode.exit();
  });

  it('displays an error message if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs(null, queue);
    }).to.throw('Jobs is not an array');
  });

  it('creates new jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Check the number of jobs in the queue
    expect(queue.testMode.jobs.length).to.equal(2);
  });

  // Add more tests as needed
});
