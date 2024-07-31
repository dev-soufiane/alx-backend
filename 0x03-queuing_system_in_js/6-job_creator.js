import kue from "kue";

// Create a Kue queue
const queue = kue.createQueue();

// Define the job data
const jobData = {
  phoneNumber: "1234567890",
  message: "New notification: Subcribed successfully!",
};

// Create a job in the queue
const job = queue.create("push_notification_code", jobData);

// Event handler for successful job creation
job.on("enqueue", () => {
  console.log("Notification job created:", job.id);
});

// Event handler for completed job
job.on("complete", () => {
  console.log("Notification job completed");
});

// Event handler for failed job
job.on("failed", () => {
  console.log("Notification job failed");
});

// Save the job to the queue
job.save();
