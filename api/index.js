import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

// IF IN CASE YOU CANNOT CONNECT TO THE DB
// PLEASE MONGODB ATLAS PROJECT AND MAKE SURE THE IP IS UPDATED
// UNDER NETWORK ACCESS. PLDT HAS DYNAMIC IP
mongoose
  .connect(
    'mongodb+srv://snakepliskin30:snakepliskinpassword@mern-estate.yoxbrfy.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate',
  )
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

app.use('/api/user', userRouter);
