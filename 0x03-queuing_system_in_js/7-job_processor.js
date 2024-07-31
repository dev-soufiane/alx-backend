import kue from "kue";

// Array of blacklisted phone numbers
const blacklistedNumbers = ["4153518780", "4153518781"];

// Function to send a notification
function sendNotification(phoneNumber, message, job, done) {
  // Track progress of the job
  job.progress(0, 100);

  // Check if the phoneNumber is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
    // Fail the job with an Error object and the error message
    return done(new Error(errorMessage));
  }

  // Track progress to 50%
  job.progress(50, 100);

  // Log sending notification to phoneNumber with message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Finish the job
  done();
}

// Create a Kue queue
const queue = kue.createQueue({ concurrency: 2 });

// Process jobs from "push_notification_code_2" queue
queue.process("push_notification_code_2", 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
