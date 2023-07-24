const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected to MongoDB'));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(8800, () => console.log('Example app listening on port 8800'))