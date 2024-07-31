function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each jobData object in the jobs array
  jobs.forEach((jobData) => {
    // Create a new job in the push_notification_code_3 queue
    const job = queue.create('push_notification_code_3', jobData).save((err) => {
      if (err) {
        // Handle job creation failure
        console.error(`Notification job ${job.id} failed: ${err}`);
      } else {
        // Handle successful job creation
        console.log(`Notification job created: ${job.id}`);
      }
    });

    // Event listener for job completion
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Event listener for job failure
    job.on('failed', (err) => {
      console.error(`Notification job ${job.id} failed: ${err}`);
    });

    // Event listener for job progress
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
}

export default createPushNotificationsJobs;
