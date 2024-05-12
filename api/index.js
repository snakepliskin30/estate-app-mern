import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

// IF IN CASE YOU CANNOT CONNECT TO THE DB
// PLEASE MONGODB ATLAS PROJECT AND MAKE SURE THE IP IS UPDATED
// UNDER NETWORK ACCESS. PLDT HAS DYNAMIC IP
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('connected to the db!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

//this middleware will allow express to accept json in body
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
