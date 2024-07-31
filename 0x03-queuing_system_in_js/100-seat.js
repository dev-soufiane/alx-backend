import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const redisClient = redis.createClient();

const port = 1245; // Assigning the port number to a constant variable

// Function to reserve seats and set the initial number of available seats
const reserveSeat = (number) => {
  redisClient.set('available_seats', number);
};

// Function to retrieve the current number of available seats
const getCurrentAvailableSeats = async () => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  const seats = await getAsync('available_seats');
  return parseInt(seats);
};

// Reserve 50 seats initially
reserveSeat(50);
let reservationEnabled = true;

const queue = kue.createQueue();

// Route to get the current number of available seats
app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: seats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  // Create and save a job in the queue
  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  // Event handlers for job completion and failure
  job.on('complete', (result) => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route to process the job queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  // Process the 'reserve_seat' jobs in the queue
  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();

    if (availableSeats === 0) {
      reservationEnabled = false;
    }

    if (availableSeats >= 0) {
      reserveSeat(availableSeats - 1);
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

app.listen(port);
